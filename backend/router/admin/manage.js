import express from "express";
import { sendServerError, sendSuccess } from "../../helper/client.js";
import { logger, readLog } from "../../helper/logger.js";
import { changeHost, debuggerHost } from "../../index.js";

const manageRoute = express.Router()

manageRoute.get("/test", (req, res) => { sendSuccess(res, "ok")})
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
        return sendSuccess(res, "Change Host", debuggerHost)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})


export default manageRoute
