import express from "express";
import fs from "fs";
import Redis from "../../cache/index.js";
import { sendServerError, sendSuccess } from "../../helper/client.js";
import { logger, readLog } from "../../helper/logger.js";
import { app_schema, changeHost } from "../../index.js";
const manageRoute = express.Router();

manageRoute.get("/test", async (_, res) => {
  try {
    await Redis.set("test", "chan qua");
    setTimeout(() => {}, 200);
    const test = await Redis.get("test");
    return sendSuccess(res, "ok", test);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});
manageRoute.get("/logs", (_, res) => {
  try {
    const result = readLog();
    res.type("text/plain");
    return res.send(result);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});
manageRoute.delete("/logs", (_, res) => {
  try {
    fs.writeFileSync("logs/error.log", "");
    return sendSuccess(res, "Delete logs successfully", "");
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});
manageRoute.get("/change-host", (req, res) => {
  const { host } = req.query;
  try {
    changeHost(host);
    logger.info(`Change app schema : ${host}`);
    return sendSuccess(res, "Change App Schema", app_schema);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

export default manageRoute;
