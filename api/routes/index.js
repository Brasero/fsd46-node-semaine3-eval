import express from "express";
import secure from "./secure/index.js";

const router = express.Router()

router.use("/secure", secure)
export default router