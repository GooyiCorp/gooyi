import express from "express";
import adminRoute from "./admin.js";
import storeRoute from "./store.js";
import tokenRoute from "./token.js";

const authRoute = express.Router();

authRoute.use("/token", tokenRoute);
authRoute.use("/admin", adminRoute);
authRoute.use("/store", storeRoute);

export default authRoute;
