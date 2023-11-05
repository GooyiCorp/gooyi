import express from "express";
import jwt from "jsonwebtoken";
import { sendAutoMail, sendError, sendServerError, sendSuccess } from "../helper/client.js";
import { email_validate, redirect_validate, register_validate } from "../validation/user.js";
import User from "../model/User.js";
import { USER } from "../constant/role.js";
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from "../constant/jwt.js";
import { ACTIVE_USER, TOKEN_LIST, TOKEN_BLACKLIST, debuggerHost } from "../index.js";
import path from 'path';
import { __dirname } from "../index.js";
import { render } from "../template/index.js";
import { verifyToken } from "../middleware/index.js";
import { Op } from "sequelize";
import { logger } from "../helper/logger.js";

const userRoute = express.Router();

userRoute.get('/info', verifyToken, async (req, res) => {
    const id = req.user.id
    try {
        const user = await User.findOne({where: {user_id: id}})
        if (!user) return sendError(res, 'User not found')
        return sendSuccess(res, 'Get user info', user)
    } catch (err) {
        logger.error(err)
    }
})
userRoute.post("/create", async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone
    } = req.body
    const user = await User.create({ first_name, last_name, email, phone })
    return sendSuccess(res, "ok")
})

userRoute.post("/email-login", async (req, res) => {
    const { email } = req.body
    const error = email_validate(email)
    if (error) return sendError(res, error)
    try {
        const user = await User.findOne({ where: { email: email}})
        if (user) {
            const userData = {
                id : user.user_id,
                email: user.email,
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
                html: `<a href="http://gooyi.de:8000/api/user/login-redirect?exp=${new Date().getTime()}&accessToken=${accessToken}&refreshToken=${refreshToken}"> Sign in </a>`
            }
            const sendmail = await sendAutoMail(options)
            if (!sendmail) return sendError(res, "Send mail failed")

            return sendSuccess(res, "Login email sent successfully")
        }
        else {
            const options = {
                from: "Gooyi.de <info@gooyi.de>",
                to: email,
                subject: '[Gooyi] Registration',
                html: `<a href="http://gooyi.de:8000/api/user/register-redirect?exp=${new Date().getTime()}&email=${email}"> Registration </a>`
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

userRoute.post('/register', async(req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone,
    } = req.body
    const err = register_validate({first_name, last_name, email, phone})
    if (err) return sendError(res, err)
    try {
        if (email) {
            const user = await User.findOne({where: {email: email}})
            if (user) return sendError(res, "This user already exists")
        } else {
            const user = await User.findOne({where: {phone: phone}})
            if (user) return sendError(res, "This user already exists")
        }
    } catch(err) {
        logger.error(err)
        sendServerError(res)
    }
    try {
        const user = await User.create({first_name, last_name, email, phone, active: true})
        const userData = {
            id: user.user_id,
            email: user.email || null,
            phone: user.phone || null,
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
        ACTIVE_USER.add(userData.id)
        return sendSuccess(res, "Register successfully", {accessToken, refreshToken, userData})
    }
    catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
    
})

userRoute.get("/login-redirect", async (req, res) => {
    const err = redirect_validate(req.query)
    if (err) return sendError(res, err);
    const {
        exp,
        accessToken,
        refreshToken
    } = req.query
    try {
        const now = new Date().getTime()
        const link = debuggerHost + "/--/main"
        const redirect_page = path.join(__dirname, '/template/redirect.html')
        if (now - exp >= 600000) return res.send(render(redirect_page, {redirect_link: link+"?error=expired"}))
        if (refreshToken in TOKEN_LIST) return res.send(render(redirect_page, {redirect_link: link+"?error=used"}))
        const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {complete: true})
        if (ACTIVE_USER.has(payload.user.user_id)) return res.send(render(redirect_page, {redirect_link: link+"?error=logged_in"}))
        const response = {
            accessToken, refreshToken
        }
        TOKEN_LIST[refreshToken] = response
        ACTIVE_USER.add(payload.user.user_id)
        return res.send(render(redirect_page, {redirect_link: link + `?accessToken=${accessToken}&refreshToken=${refreshToken}`}))
    } catch (err) {
        logger.error(err);
        sendServerError(res)
    }
});
userRoute.get('/register-redirect', async (req, res) => {
    const { exp, email } = req.query
    try {
        const user = await User.findOne({where: {email: email}})
        if (user) return res.send("This user is already registered")
        const now = new Date().getTime()
        const link = debuggerHost + "/--/main"
        const redirect_page = path.join(__dirname, '/template/redirect.html')
        if (now - exp >= 600000) return res.send(render(redirect_page, {redirect_link: link + "?error=expired"}))
        return res.send(render(redirect_page, {redirect_link: link + `?email=${email}`}))
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
})
userRoute.post("/logout", verifyToken, (req, res) => {
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
    ACTIVE_USER.delete(payload.user.user_id)

    return sendSuccess(res, "Logged out successfully")
})
userRoute.put("/update", verifyToken, async (req, res) => {
    const {first_name, last_name} = req.body
    const id = req.user.id
    try {
        const user = await User.findOne({where: {user_id:id}})
        if (!user) return sendError(res, 'User not found')
        if (first_name) user.first_name = first_name
        if (last_name) user.last_name = last_name
        await user.save()
        return sendSuccess(res, 'User updated successfully')
    } catch (err) {
        logger.error(err)
        sendServerError(res)
    }
})
userRoute.delete("/delete", verifyToken, async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findOne({where: {user_id: id }})
        if (!user) return sendError(res, 'User not found')
        await user.destroy()
        return sendSuccess("User deleted successfully")
    } catch (err) {
        logger.error(err)
        sendServerError(res)
    }
})

export default userRoute