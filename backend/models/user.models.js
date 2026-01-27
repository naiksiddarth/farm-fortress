import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { APIError } from "../utils/api-errors.js"

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required:true,
            unique: true,
            index: true
        },
        email: {
            type: String,
            required:true,
            unique: true,
            index: true
        },
        password: {
            type: String,
            required:true
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.checkPassword = async function (password) {
    try {
        const userPassword = this.password
        return await bcrypt.compare(password, userPassword)
    } catch (error) {
        APIError(500, "Error checking password")
    }
}

const User = mongoose.model("User", userSchema)

export {User}