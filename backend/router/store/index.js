import express from "express";
import couponRoute from "./coupons.js";
import profileRoute from "./profile.js";
const storeRoute = express.Router();

storeRoute.use("/profile", profileRoute);
storeRoute.use("/coupon", couponRoute);

export default storeRoute;
