import express from 'express';
import profileRoute from './profile.js';
import couponRoute from './coupons.js';
const storeRoute = express.Router();

storeRoute.use('/profile', profileRoute);
storeRoute.use('/coupon', couponRoute);

export default storeRoute;