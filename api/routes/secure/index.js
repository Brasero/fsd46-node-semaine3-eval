import express from "express";
import {getMaterialsList, login, refreshToken} from "../../controller/secure.controller.js";
import {verifyToken} from "../../middleware/jwtMiddleware.js";
import {addRealisation, getRealisations, updateRealisationQty} from "../../controller/realisation.controller.js";

const router = express.Router();

router.post("/login", login)
router.get("/getMaterials", getMaterialsList)
router.get("/realisation", getRealisations)
router.get('/refresh', verifyToken, refreshToken)
router.post("/addRealisation", verifyToken, addRealisation)
router.put("/updateRealisationQuantity", verifyToken, updateRealisationQty)

export default router