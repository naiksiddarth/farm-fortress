import { Farm } from "../models/farm.models.js"
import { asyncHandler } from "../utils/async-handler.js"
import mongoose from "mongoose"


export const createFarm = asyncHandler( async (req, res) => {           //protected
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