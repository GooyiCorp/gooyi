import express from 'express';
import { ADMIN } from '../../constant/role.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import prisma from '../../prisma/client/index.js';
import { login_validate } from '../../validation/admin.js';
import { logger } from '../../helper/logger.js';
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from '../../constant/jwt.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { TOKEN_LIST } from '../../index.js';


const adminRoute = express.Router()

adminRoute.post('/login', async (req, res) => {
    const errors = login_validate(req.body)
    if (errors) return sendError(res, errors)
    const { username, password } = req.body
    try {
        const admin = await prisma.admin.findUnique({ where: { username: username } })
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

export default adminRoute