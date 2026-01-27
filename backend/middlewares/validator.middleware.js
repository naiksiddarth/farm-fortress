import { validationResult } from "express-validator"
import { APIError } from "../utils/api-errors.js"

export const validate = async function (req, res, next){
    const error = validationResult(req)
    if(error.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    error.array().map(err => {extractedErrors.push({[err.path]: err.msg})})
    
    throw new APIError(422, "Recieved data is not valid", extractedErrors)

}   