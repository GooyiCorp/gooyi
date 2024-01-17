import express from 'express';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { TOKEN_BLACKLIST, TOKEN_LIST } from '../../index.js';
import { mod_password_validate } from '../../validation/mod.js';
import prisma from '../../prisma/client/index.js';
import { logger } from '../../helper/logger.js';

const profileRoute = express.Router()

profileRoute.put('/register', async (req, res) => {
    const { password } = req.body;
    const mod_id = req.user.id
    const error = mod_password_validate(password)
    if (error) return sendError(res, error);
    try {
        const mod = await prisma.mod.findUnique({where: {mod_id}})
        if (!mod) return sendError(res, "Not Found");
        const hash = bcrypt.hashSync(password, 10)
        await prisma.mod.update({where: {mod_id}, data: { password: hash, verified: true}})
        return sendSuccess(res, "Register successfully")
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }

})

profileRoute.post("/logout", (req, res) => {
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