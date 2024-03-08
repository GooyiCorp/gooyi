import express from "express";
import couponRoute from "./coupons.js";
import profileRoute from "./profile.js";
import userRoute from "./user.js";
import notificationRoute from "./notification.js";
const storeRoute = express.Router();

storeRoute.use("/profile", profileRoute);
storeRoute.use("/coupon", couponRoute);
storeRoute.use("/user", userRoute)
storeRoute.use("/notification", notificationRoute)
export default storeRoute;
