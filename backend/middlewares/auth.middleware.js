import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"
import { APIError } from "../utils/api-errors.js"

export const userInjector = async function (req, res, next) {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.accessToken // mind the space after Bearer
    if(!accessToken) throw new APIError(401, "No access token found in request")
    try{
        const { _id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findOne({ _id: _id}).select("-password -refreshToken")
        if(!user) {
            throw new APIError(401, "Invalid JWT token")
        }
        req.user = user
        return next()
    } catch(error) {
        if (error.name === "TokenExpiredError"){
            throw new APIError(401, "Access token expired")
        }
        throw new APIError(401, "Invalid JWT token")
    }
}