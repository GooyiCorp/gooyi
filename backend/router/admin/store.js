import express from 'express';
import prisma from '../../prisma/client/index.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { store_create_validate, upload_image_validate } from '../../validation/store.js';
import { logger } from './../../helper/logger.js';
import { mkdir, rm } from 'fs';

const storeRoute = express.Router();

const host = process.env.host
const port = process.env.port

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
        const image = await prisma.store.update({where: {store_id: store.store_id}, data: {
            logo: `http://${host}:${port}/store/${store.store_id}/logo.png`,
            background: `http://${host}:${port}/store/${store.store_id}/background.png`
        }})
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
        rm(`public/store/${store_id}`, function (err) {
            if (err) return sendError(res, "Cannot delete store's image.")
        })
        return sendSuccess(res, "Delete store successfully")
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
});


storeRoute.post("/upload", async (req, res) => {
    const error = upload_image_validate(req)
    if (error) return sendError(res, error)

    const {store_id, type} = req.body
    const image = req.files.image
    try {
        console.log(parseInt(store_id));
        const store = await prisma.store.findUnique({where: {store_id: parseInt(store_id)}})
        
        if (!store) return sendError(res, "No store found")
        image.name = type + ".png"
        mkdir(`public/store/${store_id}`, { recursive: true }, function (err) {
            if (err) return sendError(res, 'Cannot upload file.')
        })
        image.mv(`public/store/${store_id}/${image.name}`, function (err) {
            if (err) return sendError(res, "Cannot upload file.")
        })


        return sendSuccess(res, "Upload image successfully!");
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
});


export default storeRoute;