import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import prisma from '../../prisma/client/index.js';

import { create_admin_validate } from './../../validation/admin.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { logger } from '../../helper/logger.js';
import { TOKEN_BLACKLIST, TOKEN_LIST } from '../../index.js';
import { verifyAdmin, verifyToken } from '../../middleware/index.js';
import { clearTokenList } from '../../helper/jwt.js';


const profileRoute = express.Router();


profileRoute.post("/logout", verifyToken, verifyAdmin ,(req, res) => {
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