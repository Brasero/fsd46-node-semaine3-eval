import mongoose from "./index.js";
import * as mongo from "mongoose";

export const realisationMaterialSchema = new mongoose.Schema({
  material: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'Material'
  },
  qty: Number
})