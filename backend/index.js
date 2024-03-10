import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import path from "path";
import fileUpload from "express-fileupload";
import { scheduleJob } from "node-schedule";

export const __dirname = path.resolve(path.dirname(""));
dotenv.config();

// Token
export const TOKEN_LIST = {};
export const TOKEN_BLACKLIST = {};
import { clearTokenList } from "./helper/jwt.js";
// Cache connection
import Redis from "./cache/index.js";
try {
  await Redis.connect();
} catch (error) {
  console.log("Unable to connect to the Redis", error);
}
// Server initialization
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, //2MB max file(s) size
    },
  }),
);
import { morgan_log } from "./config/morgan.js";
import { logger } from "./helper/logger.js";
app.use(morgan(morgan_log));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Server Route Configuration
import adminRoute from "./router/admin/index.js";
import authRoute from "./router/auth/index.js";
import userRoute from "./router/user/index.js";
import storeRoute from "./router/store/index.js";
import testRoute from "./router/test/index.js";

import { verifyAdmin, verifyStore, verifyToken } from "./middleware/index.js";
app.use("/api/admin", verifyToken, verifyAdmin, adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/store", verifyToken, verifyStore, storeRoute);
app.use("/api/test", testRoute);

export var app_schema = process.env.APP_SCHEMA;
export function changeHost(host) {
  app_schema = host;
}
const PORT = process.env.PORT || 8000;

// Schedule
import {
  checkNewStore,
  checkOpeningStore,
  reset_day_count,
} from "./helper/schedule.js";

scheduleJob("opening", "* * * * *", () => {
  checkOpeningStore();
});
scheduleJob("new", "0 0 * * *", () => {
  checkNewStore();
  reset_day_count();
});
app.listen(PORT, () => {
  logger.info("Listening on port 8000");
  console.log("Listening on port 8000");
});

setInterval(() => {
  clearTokenList(TOKEN_BLACKLIST);
}, 3600000);
