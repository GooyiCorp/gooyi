import express from 'express';
import { sendError, sendServerError, sendSuccess } from './../../helper/client.js';
import { logger } from '../../helper/logger.js';
import stores from './store_data.json' assert { type: 'json' };
import prisma from '../../prisma/client/index.js';
import { store_create_validate } from '../../validation/store.js';
import { rm } from 'fs';
import { USER } from '../../constant/role.js';
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from '../../constant/jwt.js';
import { TOKEN_LIST } from '../../index.js';
import jwt from 'jsonwebtoken';

const testRoute = express.Router();
const host = process.env.host
const port = process.env.PORT
async function createStore(store) {
    const error = store_create_validate(store);
    if (error) return error;
    const { name,
        category,
        active,
        description,
        logo,
        background,
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
        const store = await prisma.store.create({ data: { name, category, active, description, logo, background ,enter_date: new Date(enter_date) } })
        const image = await prisma.store.update({
            where: { store_id: store.store_id }, data: {
                logo: `http://${host}:${port}/store/${store.store_id}/logo.png`,
                background: `http://${host}:${port}/store/${store.store_id}/background.png`
            }
        })
        const address = await prisma.address.create({ data: { store_id: store.store_id, longitude, latitude, street, postcode, city, detail: add_detail } })
        const openingHour = await prisma.openingHour.create({ data: { ...opening_hours, store_id: store.store_id } })

    } catch (err) {
        console.log(err);
        return sendServerError(err);
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
        await prisma.$queryRaw
        `
            TRUNCATE TABLE "Store" RESTART IDENTITY CASCADE
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

testRoute.post('/create-test-user', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone,
    } = req.body;
    try {
        const user = await prisma.user.create({ data: { first_name, last_name, email, phone, active: true } })
        const setting = await prisma.setting.create({ data: { user_id: user.user_id, message: true, terms: true } })
        return sendSuccess(res, "Create", user)
    } catch (err) {
        console.log(err);
        return sendServerError(res)
    }
});

testRoute.post('/user-login', async (req, res) => {
    const {user_id} = req.body
    try {
        const user = await prisma.user.findUnique({where: {user_id}})
        if (!user) return sendError(res, "User not found")
        const userData = {
            id: user.user_id,
            email: user.email || null,
            phone: user.phone || null,
            name: user.first_name + ' ' + user.last_name,
            role: USER
        }
        const accessToken = jwt.sign(
            {
                user: userData
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: JWT_EXPIRED
            }
        )
        const refreshToken = jwt.sign(
            {
                user: userData
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: JWT_REFRESH_EXPIRED
            }
        )
        const response = {
            accessToken, refreshToken
        }
        TOKEN_LIST[refreshToken] = response

        return sendSuccess(res, "Login successfully", response)

    } catch (err) {
        console.log(err);
        return sendServerError(res)
    }
})
export default testRoute