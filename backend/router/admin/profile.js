import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import prisma from '../../prisma/client/index.js';

import { create_admin_validate, login_validate } from './../../validation/admin.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { logger } from '../../helper/logger.js';

import { ADMIN } from '../../constant/role.js';
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from '../../constant/jwt.js';
import { TOKEN_BLACKLIST, TOKEN_LIST } from '../../index.js';
import { verifyAdmin, verifyToken } from '../../middleware/index.js';
import { clearTokenList } from '../../helper/jwt.js';


const profileRoute = express.Router();


profileRoute.post('/create', async (req, res) => {
    
    const errors = create_admin_validate(req.body)
    if (errors) return sendError(res, errors);

    const {
        name,
        username,
        password,
    } = req.body
    try {
        const hash = bcrypt.hashSync(password, 10)
        const admin = await prisma.admin.create({data: {name, username, password: hash}})
        return sendSuccess(res, "Create admin successfully", admin)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})

profileRoute.post('/login', async (req, res) => {
    const errors = login_validate(req.body)
    if (errors) return sendError(res, errors)
    
    const {username, password} = req.body
    try {
        const admin = await prisma.admin.findUnique({where: {username: username}})
        if (!admin) return sendError(res, "Cut")
        if (!bcrypt.compareSync(password, admin.password)) return sendError(res, "Wrong password!!!")


        const data = {
            id: admin.admin_id,
            username: admin.username,
            role: ADMIN
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
            accessToken, refreshToken
        }
        TOKEN_LIST[refreshToken] = response

        return sendSuccess(res, "Login successfully", response)

    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})

profileRoute.post("/logout", verifyToken, verifyAdmin ,(req, res) => {
    console.log("ok");
    const { refreshToken } = req.body
    if (refreshToken in TOKEN_LIST) delete TOKEN_LIST[refreshToken]
    else return sendError(res, "Invalid refresh token")
    const { payload } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, { complete: true })
    try {
        jwt.verify(req.verifyToken, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        TOKEN_BLACKLIST[req.verifyToken] = req.verifyToken
        clearTokenList(TOKEN_BLACKLIST)
    } catch (error) { }
    return sendSuccess(res, "Logged out successfully")
})


export default profileRoute