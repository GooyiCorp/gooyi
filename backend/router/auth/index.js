import express from 'express';
import tokenRoute from './token.js';
import adminRoute from './admin.js';

const authRoute = express.Router();

authRoute.use("/token", tokenRoute)
authRoute.use("/admin", adminRoute)


export default authRoute;