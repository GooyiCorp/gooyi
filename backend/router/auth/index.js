import express from 'express';
import tokenRoute from './token.js';

const authRoute = express.Router();

authRoute.use("/token", tokenRoute)


export default authRoute;