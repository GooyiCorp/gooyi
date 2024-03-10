import express from "express";

import storeRoute from "./store.js";
import userRoute from "./user.js";
import unitTest from "./test.js";

const testRoute = express.Router();

testRoute.use("/store", storeRoute);
testRoute.use("/user", userRoute);
testRoute.use("/test", unitTest);
export default testRoute;
