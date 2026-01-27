import { body } from "express-validator"

export const registrationValidator = function () {
    
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email cannot be empty")
            .isEmail()
            .withMessage("Please enter a valid email"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username cannot be empty"),
        body("password")
            .notEmpty()
            .withMessage("Password cannot be empty")

    ]
}

export const loginValidator = function (){
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email cannot be empty")
            .isEmail()
            .withMessage("Please enter a valid email address"),
        body("password")
            .notEmpty()
            .withMessage("Password cannot be empty")
    ]
}