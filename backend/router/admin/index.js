import express from "express";
import manageRoute from "./manage.js";
import userRoute from "./user.js";
import storeRoute from "./store.js";

const adminRoute = express.Router()

adminRoute.use('/manage', manageRoute)
adminRoute.use('/user', userRoute)
adminRoute.use('/store', storeRoute)

export default adminRoute