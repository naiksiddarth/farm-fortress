import { Router } from "express"
import { farmValidator } from "../validators/farm.validators.js"
import { createFarm } from "../controllers/farm.controllers.js"
import { validate } from "../middlewares/validator.middleware.js"
import { userInjector } from "../middlewares/auth.middleware.js"
import { APIResponse } from "../utils/api-response.js"

const router = Router()

router.route("/create").post(userInjector, farmValidator(), validate, createFarm)
router.route("/")
    .get(async (req, res, next) => {
            
            res
            .status(200)
            .json(
                new APIResponse(
                    200,
                    {
                    "userName": "John",
                    "location": "Pune, Maharashtra",
                    "farmSize": "5 acres",
                    "soilType": "Loamy",
                    "waterAccess": "Borewell",
                    "stats": {
                        "revenue": "₹45K",
                        "yield": "7.2t",
                        "soilHealth": "78%",
                        "water": "4.2L"
                    },
                    "weather": {
                        "temp": "28°C",
                        "description": "Partly Cloudy",
                        "icon": "☀️",
                        "humidity": "62%",
                        "wind": "12 km/h",
                        "rain": "15mm",
                        "uvIndex": "6/10"
                    }
                }
            )
            
            )

        next()

    })

export default router