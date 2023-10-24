import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import bodyParser from "body-parser"
import path from "path"
export const __dirname = path.resolve(path.dirname(''))
dotenv.config()

import userRoute from "./router/user.js";


export const TOKEN_LIST = {}
export const TOKEN_BLACKLIST = {}
export const ACTIVE_USER = new Set()
import { clearTokenList } from "./helper/jwt.js"
import sequelize from "./model/index.js";
try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    // await sequelize.sync({ force: true });
    // console.log("All models were synchronized successfully.");
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
import { morgan_log } from "./config/morgan.js";
import { logger, readLog } from "./helper/logger.js";
import { sendServerError, sendSuccess } from "./helper/client.js";
app.use(morgan(morgan_log))


app.use("/api/user", userRoute)
app.use("/api/test", (req, res) => {res.send({"message": "ok",})})
app.use("/api/logs", (req, res) => {
    try {
        const result = readLog();
        return sendSuccess(res, "Get Logs", result)
    } catch (err) {
        logger.info(err);
        return sendServerError(res)
    }
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    logger.info("Listening on port 8000");
})

setInterval(() => {
    clearTokenList(TOKEN_BLACKLIST)
}, 3600000)