import express from 'express';
import { sendError, sendServerError, sendSuccess } from './../../helper/client.js';
import prisma from '../../prisma/client/index.js';
import { USER } from '../../constant/role.js';
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from '../../constant/jwt.js';
import { TOKEN_LIST } from '../../index.js';
import jwt from 'jsonwebtoken';

const userRoute = express.Router();


userRoute.post('/create-user', async (req, res) => {
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

userRoute.post('/user-login', async (req, res) => {
    const { user_id } = req.body
    try {
        const user = await prisma.user.findUnique({ where: { user_id } })
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
        await prisma.user.update({ where: { user_id: userData.id }, data: { last_login: new Date() } })

        return sendSuccess(res, "Login successfully", response)

    } catch (err) {
        console.log(err);
        return sendServerError(res)
    }
})


export default userRoute