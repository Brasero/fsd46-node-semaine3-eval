import mongoose from "./index.js";
import * as mongo from "mongoose";

const materiauxSchema = new mongoose.Schema({
  name: String,
  description: String,
  company: {
    type: mongo.Types.ObjectId,
    ref: "Company"
  }
})

const Materials = mongoose.model("Material", materiauxSchema)

export default Materials;