import express from 'express';
import profileRoute from './profile.js';

const userRoute = express.Router();

userRoute.use("/profile", profileRoute)


export default userRoute;