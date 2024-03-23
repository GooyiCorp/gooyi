import express from "express";

import storeRoute from "./store.js";
import userRoute from "./user.js";
import seed from "./seed.js";

const testRoute = express.Router();

testRoute.use("/store", storeRoute);
testRoute.use("/user", userRoute);
testRoute.use("/seed", seed);
export default testRoute;
