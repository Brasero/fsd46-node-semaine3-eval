import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto-js";
import {generateToken} from "../utils/jwt.js";
import {getMaterialsWithCompanyDetails} from "../Repository/material.repository.js";

export function login(req,res) {
  const {email,password} = req.body
  const {ADMIN_EMAIL, ADMIN_HASH_PASSWORD, HMAC_PASSWORD_SECRET} = process.env
  if (email.trim() !== ADMIN_EMAIL) {
    return res.send({
      success: false,
      message: "L'email ne correspond pas"
    })
  }
  const hash = crypto.HmacSHA256(password, HMAC_PASSWORD_SECRET)
  const hashString = crypto.enc.Hex.stringify(hash)
  if (hashString !== ADMIN_HASH_PASSWORD) {
    return res.send({
      success: false,
      message: "Le mot de passe ne correspond pas"
    })
  }
  const tokens = generateToken({connected: true})
  res.send({
    success: true,
    message: "Connexion reussie",
    tokens
  })
}

export function refreshToken(req,res) {
  const tokens = generateToken({connected: true})
  res.json(tokens)
}

export async function getMaterialsList(req,res) {
  const materials = await getMaterialsWithCompanyDetails()
  res.json(materials)
}