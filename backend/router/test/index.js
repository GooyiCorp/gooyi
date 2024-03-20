import express from "express";

import storeRoute from "./store.js";
import userRoute from "./user.js";

const testRoute = express.Router();

testRoute.use("/store", storeRoute);
testRoute.use("/user", userRoute);
export default testRoute;
