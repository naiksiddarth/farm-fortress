import mongoose from "mongoose"
import * as consts from "../utils/constants.js"

const farmSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    sizeUnit: {
        type: String,
        enum: consts.landSizeUnitsEnum,
        required: true
    },
    ownedBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    soilType: {
        type: String,
        enum: consts.soilTypeEnum,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    waterSource: {
        type: String,
        enum: consts.waterSourceEnum,
        required: true
    }
})

export const Farm = mongoose.model("Farm", farmSchema)