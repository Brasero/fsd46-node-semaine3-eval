import Materials from "../models/material.js";
import Company from "../models/company.js"; // Company est importé afin que le Schema soit déclarer
// puisqu'on en a besoin pour aggregation de material

export async function getMaterialsWithCompanyDetails() {
  const materials = await Materials.find({})
    .populate("company", "name")
    .exec()
  return materials
}

export async function getMaterialByIdWithCompanyDetails(id) {
  const material = await Materials.findById(id)
    .populate("company", "name")
    .exec()
  return material
}