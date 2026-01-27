import { healthCheck } from "../controllers/healthcheck.controllers.js"
import { Router } from "express"

const healthCheckRouter = Router()

healthCheckRouter.route("/")
.get(healthCheck)

export default healthCheckRouter