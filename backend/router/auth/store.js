import express from 'express'
import prisma from '../../prisma/client/index.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { sendError, sendSuccess } from '../../helper/client.js';
import { mod_login_validate } from '../../validation/mod.js';
import { STORE } from '../../constant/role.js';
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from '../../constant/jwt.js';
import { TOKEN_LIST } from '../../index.js';

const storeRoute = express.Router();

storeRoute.post('/login', async (req, res) => {
    const error = mod_login_validate(req.body)
    const {
        email,
        password
    } = req.body;
    if (error) return sendError(res, error);

    const mod = await prisma.mod.findUnique({ where: { email: email.toLowerCase() } })
    if (!mod) return sendError(res, "No user found")
    if (!bcrypt.compareSync(password, mod.password)) return sendError(res, "Wrong password!!!")
    const data = {
        id: mod.mod_id,
        role: STORE
    }
    const accessToken = jwt.sign(
        {
            user: data
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: JWT_EXPIRED
        }
    )
    const refreshToken = jwt.sign(
        {
            user: data
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: JWT_REFRESH_EXPIRED
        }
    )
    const response = {
        accessToken, refreshToken, action: mod.verified ? "LOGIN" : "CREATE_PASSWORD"
    }
    TOKEN_LIST[refreshToken] = response
    return sendSuccess(res, "Login successfully", response)
});



export default storeRoute