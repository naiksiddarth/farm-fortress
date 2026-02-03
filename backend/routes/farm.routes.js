import { Router } from "express"
import { farmValidator } from "../validators/farm.validators.js"
import { createFarm, getFarm } from "../controllers/farm.controllers.js"
import { validate } from "../middlewares/validator.middleware.js"
import { userInjector } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/create").post(userInjector, farmValidator(), validate, createFarm)
router.route("/")
    .get(userInjector, getFarm)

export default router