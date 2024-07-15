import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();

const {JWT_SECRET} = process.env

export const generateToken = (payload) => {
  const tokens = {
    jwt: "",
    refresh: ""
  }
  tokens.jwt = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h", algorithm: "HS256"})
  tokens.refresh = jwt.sign({...payload, refresh: true}, JWT_SECRET, {expiresIn: "24h", algorithm: "HS256"})
  return tokens
}

export const checkToken = (token) => {
  return jwt.verify(token, JWT_SECRET, {algorithm: "HS256"}, (err, decoded) => {
    return !(err || decoded === null || decoded === undefined);
  })
}

export const extractToken = (req) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    return authHeader.split(' ')[1]
  }
  return null
}