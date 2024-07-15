import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(
  () => {
    console.log("Connected to DB")
  },
  (reason) => {
    console.log("Failed to access DB : " + reason)
  })

export default mongoose