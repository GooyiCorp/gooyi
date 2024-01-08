import express from 'express';
import { sendError, sendServerError, sendSuccess } from './../../helper/client.js';
import stores from './store_data.json' assert { type: 'json' };
import prisma from '../../prisma/client/index.js';
import { store_create_validate } from '../../validation/store.js';
import { rm } from 'fs';
import { checkNewStore, checkOpeningStore } from '../../helper/schedule.js';
import { logger } from '../../helper/logger.js';

const storeRoute = express.Router()


const host = process.env.host
const port = process.env.PORT
async function createStore(store) {
    const error = store_create_validate(store);
    if (error) return error;
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
        opening_hours,
        service
    } = store;
    try {
        const categories = category.map(item => {
            return {
                "where": { "name": item.charAt(0).toUpperCase() + item.slice(1) },
                "create": { "name": item.charAt(0).toUpperCase() + item.slice(1) }
            }
        })
        const services = service.map(item => {
            return {
                "where": { "name": item.charAt(0).toUpperCase() + item.slice(1) },
                "create": { "name": item.charAt(0).toUpperCase() + item.slice(1) }
            }
        })
        const store = await prisma.store.create({
            data: {
                name, active, description, enter_date: new Date(enter_date),
                category: {
                    connectOrCreate: categories
                },
                service: {
                    connectOrCreate: services
                }
            }
        })
        const image = await prisma.store.update({
            where: { store_id: store.store_id }, data: {
                logo: `http://${host}:${port}/store/${store.store_id}/logo.png`,
                background: `http://${host}:${port}/store/${store.store_id}/background.png`
            }
        })
        const address = await prisma.address.create({ data: { store_id: store.store_id, longitude, latitude, street, postcode, city, detail: add_detail } })
        const openingHour = await prisma.openingHour.create({ data: { ...opening_hours, store_id: store.store_id } })

    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }

}


storeRoute.post('/create-stores', async (req, res) => {

    try {
        for (const store of stores) {
            await createStore(store);
        }
        return sendSuccess(res, "ok")
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
})

storeRoute.delete('/delete-stores', async (req, res) => {
    try {
        await prisma.$queryRaw
            `
            TRUNCATE TABLE "Store" RESTART IDENTITY CASCADE
        `
        await prisma.$queryRaw
            `
            TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE
        `
        rm(`public/store`, function (err) {
            // if (err) return sendError(res, "Cannot delete store's image.")
        })
        return sendSuccess(res, "success");

    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
});


storeRoute.put('/check-opening', async (req, res) => {
    const result = await checkOpeningStore()
    return sendSuccess(res, "success", result);
})

storeRoute.put('/check-new-store', async (req, res) => {
    const result = await checkNewStore()
    return sendSuccess(res, "success", result);
})

export default storeRoute