import express from 'express';
import profileRoute from './profile.js';

const storeRoute = express.Router();

storeRoute.use('/profile', profileRoute)

export default storeRoute;