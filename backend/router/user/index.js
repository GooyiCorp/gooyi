import express from "express";
import categories from "./categories.js";
import couponRoute from "./coupon.js";
import find from "./find.js";
import profileRoute from "./profile.js";
import storeRoute from "./store.js";
import notificationRoute from "./notification.js";

const userRoute = express.Router();

userRoute.use("/profile", profileRoute);
userRoute.use("/store", storeRoute);
userRoute.use("/find", find);
userRoute.use("/categories", categories);
userRoute.use("/coupons", couponRoute);
userRoute.use("/notification", notificationRoute)
export default userRoute;
