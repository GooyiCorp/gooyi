import express from 'express';
import axios from 'axios';
import { sendServerError, sendSuccess } from './../../helper/client.js';
import { logger } from '../../helper/logger.js';
import stores from './store_data.json' assert { type: 'json' };
import prisma from '../../prisma/client/index.js';
import { store_create_validate } from '../../validation/store.js';

const testRoute = express.Router();

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
        opening_hours
    } = store;
    try {
        const store = await prisma.store.create({ data: { name, category, active, description, enter_date: new Date(enter_date) } })
        const address = await prisma.address.create({ data: { store_id: store.store_id, longitude, latitude, street, postcode, city, detail: add_detail } })
        const openingHour = await prisma.openingHour.create({ data: { ...opening_hours, store_id: store.store_id } })

    } catch (err) {
        console.log(err);
    }

}


testRoute.post('/create-test-stores', async (req, res) => {

    try {
        stores.forEach(async (store) => {
            createStore(store);
        })
        return sendSuccess(res, "ok")
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
})

testRoute.delete('/delete-all-stores', async (req, res) => {
    try {
        await prisma.store.deleteMany()
        return sendSuccess(res, "success");
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
});

export default testRoute