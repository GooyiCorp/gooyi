import express from "express";
import manageRoute from "./manage.js";
import storeMemberRoute from "./store_member.js";
import openingHours from "./openingHours.js";
import profileRoute from "./profile.js";
import storeRoute from "./store.js";
import userRoute from "./user.js";

const adminRoute = express.Router();
adminRoute.use("/profile", profileRoute);
adminRoute.use("/manage", manageRoute);
adminRoute.use("/user", userRoute);
adminRoute.use("/store", storeRoute);
adminRoute.use("/opening-hours", openingHours);
adminRoute.use("/store-member", storeMemberRoute);
export default adminRoute;
