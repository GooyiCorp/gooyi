import express from 'express';
import profileRoute from './profile.js';
import storeRoute from './store.js';
import find from './find.js';
import categories from './categories.js';

const userRoute = express.Router();

userRoute.use("/profile", profileRoute)
userRoute.use("/store", storeRoute)
userRoute.use("/find", find)
userRoute.use("/categories", categories)

export default userRoute;