import express from 'express';
import prisma from '../../prisma/client/index.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { generate_key, sendAutoMail, sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { mod_login_validate } from '../../validation/mod.js';
import { STORE } from '../../constant/role.js';
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from '../../constant/jwt.js';
import { TOKEN_LIST } from '../../index.js';
import { logger } from '../../helper/logger.js';

const storeRoute = express.Router();

storeRoute.post('/login', async (req, res) => {
    const error = mod_login_validate(req.body);
    const { email, password } = req.body;
    if (error) {
        return sendError(res, error);
    }
    try {
        const mod = await prisma.mod.findUnique({ where: { email: email.toLowerCase() } });
        if (!mod) {
            return sendError(res, "No user found");
        }
        if (!bcrypt.compareSync(password, mod.password)) {
            return sendError(res, "Wrong password!!!");
        }
        const data = {
            id: mod.mod_id,
            store_id: mod.store_id,
            role: STORE
        };
        const accessToken = jwt.sign(
            { user: data },
            process.env.JWT_SECRET_KEY,
            { expiresIn: JWT_EXPIRED }
        );
        const refreshToken = jwt.sign(
            { user: data },
            process.env.JWT_SECRET_KEY,
            { expiresIn: JWT_REFRESH_EXPIRED }
        );
        const response = {
            accessToken,
            refreshToken,
            action: mod.verified ? "LOGIN" : "CREATE_PASSWORD",
        };
        TOKEN_LIST[refreshToken] = response;
        return sendSuccess(res, "Login successfully", response);
    } catch (err) {
        logger.error(err);
        return sendServerError(res);
    }
});

storeRoute.put('/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return sendError(res, "Email is required");
    }
    try {
        const mod = await prisma.mod.findUnique({ where: { email: email.toLowerCase() } });
        if (!mod) {
            return sendError(res, "No user found");
        }
        const password = generate_key(11);
        const hash = bcrypt.hashSync(password, 10);
        await prisma.mod.update({ where: { email: email.toLowerCase() }, data: { password: hash } });
        const options = {
            from: "Gooyi.de <info@gooyi.de>",
            to: email,
            subject: '[Gooyi] Reset password',
            html: `<p>Default Password: ${password}</p>`
        };
        const sendmail = await sendAutoMail(options);
        if (!sendmail) {
            return sendError(res, "Send mail failed");
        }
        return sendSuccess(res, "Reset password successfully", { defaultPassword: password });
    } catch (err) {
        logger.error(err);
        return sendServerError(res);
    }
});

export default storeRoute;
