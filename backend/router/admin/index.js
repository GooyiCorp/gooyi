import express from "express";
import manageRoute from "./manage.js";
import userRoute from "./user.js";
import storeRoute from "./store.js";
import profileRoute from "./profile.js";
import openingHours from "./openingHours.js";
import modRoute from "./mod.js";

const adminRoute = express.Router()
adminRoute.use('/profile', profileRoute)
adminRoute.use('/manage', manageRoute)
adminRoute.use('/user', userRoute)
adminRoute.use('/store', storeRoute)
adminRoute.use('/opening-hours', openingHours)
adminRoute.use('/mod', modRoute)
export default adminRoute