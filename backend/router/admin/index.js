import express from "express";
import manageRoute from "./manage.js";
import userRoute from "./user.js";

const adminRoute = express.Router()

adminRoute.use('/manage', manageRoute)
adminRoute.use('/user', userRoute)

export default adminRoute