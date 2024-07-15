import {extractToken, checkToken} from "../utils/jwt.js";

export const verifyToken = (req, res, next) => {
  const token = extractToken(req)
  if (token) {
    const isConnected = checkToken(token)
    if (isConnected) {
      req.isConnected = true
      next()
    } else {
      return res.status(401).send("Unauthorized")
    }
  } else {
    res.status(401).send("Unauthorized")
  }
}