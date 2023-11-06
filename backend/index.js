import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import bodyParser from "body-parser"
import path from "path"
export const __dirname = path.resolve(path.dirname(''))
dotenv.config()


// Token 
export const TOKEN_LIST = {}
export const TOKEN_BLACKLIST = {}
export const ACTIVE_USER = {}
import { clearTokenList } from "./helper/jwt.js"
// Database connection
import sequelize from "./model/index.js";
try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    // await sequelize.sync({ force: true });
    // console.log("All models were synchronized successfully.");
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
// Server initialization
const app = express();
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
import { morgan_log } from "./config/morgan.js";
import { logger, readLog } from "./helper/logger.js";
import { sendServerError, sendSuccess } from "./helper/client.js";
app.use(morgan(morgan_log))

// Server Route Configuration
import adminRoute from "./router/admin/index.js";
import authRoute from "./router/auth.js";
import userRoute from "./router/user.js";

app.use("/api/admin", adminRoute)
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

export var debuggerHost = process.env.APP_SCHEMA
export function changeHost(host) {debuggerHost = host}
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    logger.info("Listening on port 8000");
})

setInterval(() => {
    clearTokenList(TOKEN_BLACKLIST)
}, 3600000)