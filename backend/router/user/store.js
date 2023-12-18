import express from 'express';
import prisma from '../../prisma/client/index.js';
import { find_stores_validate } from '../../validation/store.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { logger } from '../../helper/logger.js';

const storeRoute = express.Router();


storeRoute.get("/", async (req, res) => {
    const error = find_stores_validate(req.body)
    if  (error) return sendError(res, error);
    const {longitude, latitude, radius} = req.body
    if (!radius) radius = 1000
    try {
        const stores = await prisma.store.findClosestStores({longitude, latitude, radius})
        return res.send(stores)
    } catch (error) {
        logger.error(error);
        return sendServerError(res, error);
    }
})

export default storeRoute