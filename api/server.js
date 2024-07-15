import express from "express";
import cors from 'cors';
import router from "./routes/index.js";
import dotenv from 'dotenv';

dotenv.config();

const server = express();
server.use(cors({
  origin: "http://localhost:5173"
}))
server.use(express.urlencoded({extended: false}))
server.use(express.json())

const PORT = process.env.API_PORT || 8000

server.use(router)

server.listen(PORT, onListening)
function onListening() {
  console.log("api listening on port " + PORT)
}