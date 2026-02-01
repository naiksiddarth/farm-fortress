import { body } from "express-validator"

export const farmValidator = () => {
    return [
        body("location")
            .trim()
            .notEmpty()
            .withMessage("Location cannot be empty"),
        body("farmSize")
            .trim()
            .notEmpty()
            .withMessage("Location cannot be empty"),
        body("farmSizeUnit")
            .trim()
            .notEmpty()
            .withMessage("Location cannot be empty"),
        body("soilType")
            .trim()
            .notEmpty()
            .withMessage("Location cannot be empty"),
        body("waterSource")
            .trim()
            .notEmpty()
            .withMessage("Location cannot be empty")
    ]
}