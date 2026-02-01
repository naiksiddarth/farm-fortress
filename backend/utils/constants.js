export const soilType = {
    ALLUVIAL: "ALLUVIAL",
    BLACK: "BLACK",
    RED: "RED",
    LATERITE: "LATERITE",
    DESERT: "DESERT",
    FOREST_AND_MOUNTAIN: "FOREST_AND_MOUNTAIN",
    SALINE_AND_ALKALINE: "SALINE_AND_ALKALINE",
    PEATY_AND_MARSHY: "PEATY_AND_MARSHY"
}
export const soilTypeEnum = Object.values(soilType)

export const soilTypeDisplayName = {
    ALLUVIAL: "Alluvial Soil",
    BLACK: "Black Soil (Regur)",
    RED: "Red Soil",
    LATERITE: "Laterite Soil",
    DESERT: "Desert (Arid) Soil",
    FOREST_AND_MOUNTAIN: "Forest & Mountain Soil",
    SALINE_AND_ALKALINE: "Saline & Alkaline Soil",
    PEATY_AND_MARSHY: "Peaty & Marshy Soil"
}
export const soilTypeDisplayNameEnum = Object.values(soilTypeDisplayName)

export const landSizeUnits = {
    SQ_METER: "SQ_METER",
    SQ_FOOT: "SQ_FOOT",
    SQ_YARD: "SQ_YARD",
    ACRE: "ACRE"
}
export const landSizeUnitsEnum = Object.values(landSizeUnits)

export const landSizeUnitDisplayName = {
    SQ_METER: "Sq meter",
    SQ_FOOT: "Sq Foot",
    SQ_YARD: "Sq Yard",
    ACRE: "Acres"
}
export const landSizeUnitDisplayNameEnum = Object.values(landSizeUnitDisplayName)

export const waterSource = {
  "natural": ["Rain", "River", "Lake", "Ocean"],
  "groundwater": ["Well", "Borewell", "Aquifer"],
  "manmade": ["Dam", "Canal", "Tank"],
  "treated": ["Desalinated Water", "Recycled Water"]
}
export const waterSourceEnum = Object.keys(waterSource)