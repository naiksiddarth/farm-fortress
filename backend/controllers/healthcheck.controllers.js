import { asyncHandler } from "../utils/async-handler.js"
import { APIResponse } from "../utils/api-response.js"

const healthCheck = asyncHandler((req, res) => {
    res.json( new APIResponse({message: "Server is running"}))
})

export { healthCheck }