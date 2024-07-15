import mongoose from "./index.js";

const companySchema = new mongoose.Schema({
  name: String
})

const Company = mongoose.model("Company", companySchema)

export default Company