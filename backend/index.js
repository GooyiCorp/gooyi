import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
dotenv.config()

export const TOKEN_LIST = {}
export const TOKEN_BLACKLIST = {}

import {pool} from "./config/db.config.js";


const app = express();
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("listening on port 8000");
})