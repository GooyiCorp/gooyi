import express from "express";
import { sendServerError, sendSuccess } from "../../helper/client.js";
import { logger, readLog } from "../../helper/logger.js";
import { changeHost, app_schema } from "../../index.js";
import Redis from "../../cache/index.js";

const manageRoute = express.Router()

manageRoute.get("/test", async (req, res) => {
    try {
        await Redis.set("test", "chan qua")
        setTimeout(() => {}, 200)
        const test = await Redis.get("test")
        return sendSuccess(res, "ok", test)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})
manageRoute.get("/logs", (req, res) => {
    try {
        const result = readLog();
        res.type("text/plain")
        return res.send(result);
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
})
manageRoute.get("/change-host", (req, res) => {
    const { host } = req.query
    try {
        changeHost(host)
        logger.info(`Change host : ${host}`)
        return sendSuccess(res, "Change Host", app_schema)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})


export default manageRoute
