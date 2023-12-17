import express from 'express';
import prisma from '../../prisma/client/index.js';

const storeRoute = express.Router();


storeRoute.post('/create', async (req, res) => {
    const { name,
        category, 
        active, 
        description, 
        enter_date, 
        longtitude, 
        latitude,
        street,
        postcode
    } = req.body;
    
    res.send("ok")
})




export default storeRoute;