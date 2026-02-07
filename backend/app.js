import express from "express"
import cors from "cors"
import healthCheckRouter from "./routes/healthcheck.routes.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import farmRouter from "./routes/farm.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))

app.use("/api/healthcheck", healthCheckRouter)
app.use("/api/auth", authRouter)
app.use("/api/farm", farmRouter)

app.use((error, req, res, next) => {
    res
        .status(error.statusCode)
        .json({
            status: error.statusCode,
            message: error.message
        })
        return
})

export default app
