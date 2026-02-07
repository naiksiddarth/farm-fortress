import { User } from "../models/user.models.js"
import { asyncHandler } from "../utils/async-handler.js"
import { APIResponse } from "../utils/api-response.js"
import { APIError } from "../utils/api-errors.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async function (userId) {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save()
        return { accessToken, refreshToken }
    } catch (error) {
        throw new APIError(500, "Something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    let user = undefined
    try{
        user = await User.create({
            username: username,
            email: email,
            password: password
        })
    } catch (err) {
        if(err.code === 11000){
            throw new APIError(409,
                "User alredy exists"
            )
        }
        else{
            console.log(err)
        }
    }
    if (!user){
        throw new APIError(500, "There was a error creating user")

    }
    try {
        res
            .status(201)
            .json(new APIResponse(
                200,
                {
                    user: user
                },
                "User created succesfully"
            ))
    } catch (err) {
        throw new APIError(500, "There was a error creating user")
    }
})

const loginUser = asyncHandler(async function (req, res) {
    const { email, password } = await req.body
    const user = await User.findOne({ email: email.trim() })
    if (!user) throw new APIError(401, "user not found")
    if (user.checkPassword(password)) {
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
        const refreshTokenOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/api/auth/refresh-token"
        }
        const accesTokenOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }
        return res
            .status(200)
            .cookie("accessToken", accessToken, accesTokenOptions)
            .cookie("refreshToken", refreshToken, refreshTokenOptions)
            .json(new APIResponse(
                200,
                {
                    user: user,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                },
                "Login succesful"
            ))
    } else {
        throw new APIError(401, "Password Incorrect")
    }
})

const logoutUser = asyncHandler(async function (req, res) {
    const user = req.user
    if (!user) {
        throw new APIError(401, "You can't access this route. Login first")
    }
    const loggedOutUser = await User.findByIdAndUpdate(user._id, {
        $set: {
            refreshToken: ""
        }
    },
        {
            new: true
        }
    )

    const refreshTokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/api/auth/refresh"
    }
    const accesTokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

    return res
        .status(200)
        .clearCookie("accessToken", accesTokenOptions)
        .clearCookie("refreshToken", refreshTokenOptions)
        .json(
            new APIResponse(
                200,
                {},
                "User logged out"
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingToken = req.cookies?.refreshToken || req.body.refreshToken

    if (!incommingToken) {
        throw new APIError(400, "No refreshToken sent")
    }
    let  decodedToken = undefined
    try {
        decodedToken = jwt.verify(incommingToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (err) {
        throw new APIError(400, "Cannot verify Refresh Token")
    }
    const user = await User.findById(decodedToken._id)
    
    if (!user || user?.refreshToken !== incommingToken) {
        throw new APIError(400, "Invalid Refresh token")
    }

    const generatedAccessToken = await user.generateAccessToken()
    const accesTokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    }

    return res
        .status(200)
        .cookie('accessToken', generatedAccessToken, accesTokenOptions)
        .json(
            new APIResponse(
                200,
                {
                    accessToken: generatedAccessToken,
                    refreshToken: user.refreshToken
                }
            )
        )
})

export { registerUser, loginUser, logoutUser, refreshAccessToken }