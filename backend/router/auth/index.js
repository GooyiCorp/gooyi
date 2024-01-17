import express from 'express';
import tokenRoute from './token.js';
import adminRoute from './admin.js';
import storeRoute from './store.js';

const authRoute = express.Router();

authRoute.use("/token", tokenRoute)
authRoute.use("/admin", adminRoute)
authRoute.use("/store", storeRoute)


export default authRoute;