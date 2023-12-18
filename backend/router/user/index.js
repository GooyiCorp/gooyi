import express from 'express';
import profileRoute from './profile.js';
import storeRoute from './store.js';

const userRoute = express.Router();

userRoute.use("/profile", profileRoute)
userRoute.use("/store", storeRoute)

export default userRoute;