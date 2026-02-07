import { Farm } from "../models/farm.models.js"
import { APIResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"
import mongoose from "mongoose"
import * as enums from "../utils/constants.js"

export const createFarm = asyncHandler(async (req, res) => {           //protected
    const { location, farmSize, farmSizeUnit, soilType, waterSource } = req.body

    const farm = await Farm.create({
        ownedBy: new mongoose.Types.ObjectId(req.user._id),
        size: farmSize,
        sizeUnit: farmSizeUnit,
        location: location,
        waterSource: waterSource,
        soilType: soilType
    })
    res.status(201).json(farm)
})

export const getFarm = asyncHandler(async (req, res) => {           //protected
    const user = req.user
    const farm = await Farm.findOne({ ownedBy: user._id })
    res
        .status(200)
        .json(
            new APIResponse(200,
                {
                    farm: farm,
                    enum: {
                        ...enums.soilTypeDisplayName,
                        ...enums.landSizeUnitDisplayName
                    }

                },
                "farm fetch succesfull"
            )
        )

})