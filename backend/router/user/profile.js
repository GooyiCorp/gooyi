import express from "express";
import jwt from "jsonwebtoken";
import { generate_key, generate_user_id, sendAutoMail, sendError, sendServerError, sendSuccess } from "../../helper/client.js";
import { email_validate, redirect_validate, register_validate } from "../../validation/user.js";
import { USER } from "../../constant/role.js";
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from "../../constant/jwt.js";
import { TOKEN_LIST, TOKEN_BLACKLIST, app_schema } from "../../index.js";
import path from 'path';
import { __dirname } from "../../index.js";
import { render } from "../../template/index.js";
import { verifyToken } from "../../middleware/index.js";
import { logger } from "../../helper/logger.js";
import Redis from "../../cache/index.js";

import prisma from "../../prisma/client/index.js";
import { clearTokenList } from "../../helper/jwt.js";

const profileRoute = express.Router();

profileRoute.get('/info', verifyToken, async (req, res) => {
    const id = req.user.id
    try {
        const user = await prisma.user.findUnique({where: {user_id: id}})
        if (!user) return sendError(res, 'User not found')
        return sendSuccess(res, 'Get user info', user)
    } catch (err) {
        logger.error(err)
    }
})

profileRoute.post("/email-login", async (req, res) => {
    const { email } = req.body
    const error = email_validate(email)
    if (error) return sendError(res, error)
    try {
        const host = process.env.host
        const port = process.env.PORT
        const user = await prisma.user.findUnique({ where: { email }})
        if (user) {
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
            // Email
            const options = {
                from: "Gooyi.de <info@gooyi.de>",
                to: email,
                subject: '[Gooyi] Log in ',
                html: `<a href="http://${host}:${port}/api/user/profile/login-redirect?exp=${new Date().getTime()}&accessToken=${accessToken}&refreshToken=${refreshToken}"> Sign in </a>`
            }
            const sendmail = await sendAutoMail(options)
            if (!sendmail) return sendError(res, "Send mail failed")

            return sendSuccess(res, "Login email sent successfully", { accessToken, refreshToken})
        }
        else {
            const key = generate_key(8)
            await Redis.hSet("verified_code", email, key)
            const options = {
                from: "Gooyi.de <info@gooyi.de>",
                to: email,
                subject: '[Gooyi] Registration',
                html: `<a href="http://${host}:${port}/api/user/profile/register-redirect?exp=${new Date().getTime()}&email=${email}&key=${key}"> Registration </a>`
            }
            const sendmail = await sendAutoMail(options)
            if (!sendmail) return sendError(res, "Send mail failed")
            return sendSuccess(res, "Register Email sent successfully")
        }

    } catch (err) {
        logger.error(err);
        sendServerError(res)
    }

})

profileRoute.post('/register', async(req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone,
        key,
    } = req.body
    const err = register_validate({first_name, last_name, email, phone, key})
    if (err) return sendError(res, err)
    try {
        const verified_code = await Redis.hGet("verified_code", email)
        if (verified_code !== key) return sendError(res, "Unauthorized.", 403)
        if (email) {
            const user = await prisma.user.findUnique({where: {email: email}})
            if (user) return sendError(res, "This user already exists")
        } else {
            const user = await prisma.user.findUnique({where: {phone: phone}})
            if (user) return sendError(res, "This user already exists")
        }
    } catch(err) {
        logger.error(err)
        sendServerError(res)
    }
    try {
        const user_id = await generate_user_id()
        if (user_id === 'error') return sendServerError(res)
        const user = await prisma.user.create({ data: { user_id, first_name, last_name, email, phone, active: true } })
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
        await prisma.user.update({ where: { user_id: userData.id }, data: { last_login : new Date()}})
        return sendSuccess(res, "Register successfully", {accessToken, refreshToken, userData})
    }
    catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
    
})

profileRoute.get("/login-redirect", async (req, res) => {
    const err = redirect_validate(req.query)
    if (err) return sendError(res, err);
    const {
        exp,
        accessToken,
        refreshToken
    } = req.query
    try {
        const now = new Date().getTime()
        const link = app_schema + "main"
        const redirect_page = path.join(__dirname, '/template/redirect.html')
        if (now - exp >= 600000) return res.send(render(redirect_page, {redirect_link: link+"?error=expired"}))
        if (refreshToken in TOKEN_LIST) return res.send(render(redirect_page, {redirect_link: link+"?error=used"}))
        try {
            jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {complete: true})
        } catch (e) {return sendError(res, "jwt expired. Please try again!")}
        const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {complete: true})
        const response = {
            accessToken, refreshToken
        }
        TOKEN_LIST[refreshToken] = response
        await prisma.user.update({ where: { user_id: payload.user.id }, data: { last_login: new Date() } })
        return res.send(render(redirect_page, {redirect_link: link + `?accessToken=${accessToken}&refreshToken=${refreshToken}`}))
    } catch (err) {
        logger.error(err);
        sendServerError(res)
    }
});
profileRoute.get('/register-redirect', async (req, res) => {
    const { exp, email, key } = req.query
    try {
        const verified_code = await Redis.hGet("verified_code", email)
        if (verified_code !== key) return sendError(res, "Unauthorized.", 403)
        const user = await prisma.user.findUnique({where: {email: email}})
        if (user) return res.send("This user is already registered")
        const now = new Date().getTime()
        const link = app_schema + "register/enterinfo"
        const redirect_page = path.join(__dirname, '/template/redirect.html')
        if (now - exp >= 600000) return res.send(render(redirect_page, {redirect_link: link + "?error=expired"}))
        return res.send(render(redirect_page, {redirect_link: link + `?email=${email}&key=${key}`}))
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
})
profileRoute.post("/logout", verifyToken, (req, res) => {
    const { refreshToken } = req.body
    if (refreshToken in TOKEN_LIST) delete TOKEN_LIST[refreshToken]
    else return sendError(res, "Invalid refresh token")
    const { payload } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, {complete: true})
    try {
        jwt.verify(req.verifyToken, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        TOKEN_BLACKLIST[req.verifyToken] = req.verifyToken
        clearTokenList(TOKEN_BLACKLIST)
    } catch (error) { }
    return sendSuccess(res, "Logged out successfully")
})
profileRoute.put("/update", verifyToken, async (req, res) => {
    const {first_name, last_name} = req.body
    const id = req.user.id
    try {
        const user = await prisma.user.findUnique({where: {user_id:id}})
        if (!user) return sendError(res, 'User not found')
        await prisma.user.update({where: {user_id: id},data: {first_name, last_name}})
        return sendSuccess(res, 'User updated successfully')
    } catch (err) {
        logger.error(err)
        sendServerError(res)
    }
})
profileRoute.delete("/delete", verifyToken, async (req, res) => {
    try {
        const id = req.user.id
        const user = await prisma.user.findUnique({where: {user_id: id }})
        if (!user) return sendError(res, 'User not found')
        await prisma.user.delete({where: {user_id: id}})
        return sendSuccess("User deleted successfully")
    } catch (err) {
        logger.error(err)
        sendServerError(res)
    }
})

export default profileRoute