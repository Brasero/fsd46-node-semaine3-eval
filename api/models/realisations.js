import mongoose from "./index.js"
import * as mongo from 'mongoose'
import {realisationMaterialSchema} from "./realisationMaterial.js";

const realisationSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  category: String,
  slug: {
    type: String,
    unique: true
  },
  quantity: Number,
  materiaux: [realisationMaterialSchema]
});

const Realisations = mongoose.model("Realisations", realisationSchema);

export default Realisations