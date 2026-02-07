import { Router } from "express"
import { registerUser, loginUser, logoutUser, refreshAccessToken, getUser} from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/validator.middleware.js"
import { registrationValidator, loginValidator } from "../validators/register.validators.js"
import { userInjector } from "../middlewares/auth.middleware.js"

const authRouter = Router()

authRouter.route("/register").post(registrationValidator(), validate, registerUser)
authRouter.route("/login").post(loginValidator(), validate, loginUser)
authRouter.route("/logout").post(userInjector, logoutUser)
authRouter.route('/refresh-token').post(refreshAccessToken)
authRouter.route('/user').get(userInjector, getUser)

export default authRouter