import express from 'express';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { create_mod_validate } from '../../validation/mod.js';
import { logger } from '../../helper/logger.js';
import bcrypt from 'bcrypt'
import prisma from '../../prisma/client/index.js';

const modRoute = express.Router();

modRoute.post('/create', async (req, res) => {
    const error = create_mod_validate(req.body);
    if (error) return sendError(res, error);
    const {
        store_id,
        name,
        email,
        phone,
    } = req.body;
    try {
        const check = await prisma.mod.findMany({where: {OR: [{email, phone}]}})
        if (check.lenght > 0) return sendError(res, "Email or Phone exists")
        const mod = await prisma.mod.create({data: {store_id, name, email, phone}})
        return sendSuccess(res, "Create mod successfully", mod)
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
})


export default modRoute