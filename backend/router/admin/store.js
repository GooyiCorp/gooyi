import express from 'express';
import prisma from '../../prisma/client/index.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { store_create_validate } from '../../validation/store.js';
import { logger } from './../../helper/logger.js';

const storeRoute = express.Router();


storeRoute.post('/create', async (req, res) => {
    const { name,
        category, 
        active, 
        description, 
        enter_date, 
        longitude, 
        latitude,
        street,
        postcode,
        city,
        add_detail,
        opening_hours
    } = req.body;
    const error = store_create_validate(req.body);
    if (error) return sendError(res,error);
    try {
        const store = await prisma.store.create({data: {name, category, active, description, enter_date: new Date(enter_date)}})
        const address = await  prisma.address.create({data: {store_id: store.store_id, longitude, latitude, street, postcode, city, detail: add_detail}})
        const openingHour = await prisma.openingHour.create({data: {...opening_hours, store_id: store.store_id}})
        return res.send({store, address, openingHour});

    } catch (err) {
        console.log(err);
        logger.error(err);
        return sendServerError(res);
    }
})

storeRoute.delete("/:id", async (req, res) => {
    const store_id = req.params.id
    try {
        await prisma.store.delete({where: {store_id: parseInt(store_id)}})
        return sendSuccess(res, "Delete store successfully")
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
});



export default storeRoute;