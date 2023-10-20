import express from "express";
import jwt from "jsonwebtoken";
import { sendAutoMail, sendError, sendServerError, sendSuccess } from "../helper/client.js";
import { email_validate, redirect_validate, register_validate } from "../validation/user.js";
import User from "../model/User.js";
import { USER } from "../constant/role.js";
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from "../constant/jwt.js";
import { ACTIVE_USER, TOKEN_LIST, TOKEN_BLACKLIST } from "../index.js";
import path from 'path';
import { __dirname } from "../index.js";
import { render } from "../template/index.js";
import { verifyToken } from "../middleware/index.js";
const userRoute = express.Router();

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
                from: "gooyi.de",
                to: email,
                subject: '[Gooyi] Log in ',
                html: `<a href="https://piglet-together-wasp.ngrok-free.app/api/user/redirect?exp=${new Date().getTime()}&accessToken=${accessToken}&refreshToken=${refreshToken}"> Sign in </a>`
            }
            const sendmail = await sendAutoMail(options)
            if (!sendmail) return sendError(res, "Send mail failed")

            return sendSuccess(res, "Login email sent successfully")
        }
        else {
            const options = {
                from: "Gooooooyi",
                to: email,
                subject: '[Gooyi] Register',
                html: `<a href="google.com"></a>`
            }
            return sendSuccess(res, "Register Email sent successfully", )
        }

    } catch (err) {
        console.error(err);
        sendServerError(res)
    }

})

userRoute.post('/register', async(req, res) => {
    const {
        first_name,
        last_name,
        email
    } = req.body
    const err = register_validate({first_name, last_name, email})
    if (err) return sendError(res, err)
    
    const user = await User.create({first_name, last_name, email, active: true})
    const userData = {
        id: user.user_id,
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
    const response = {
        accessToken, refreshToken
    }

    return sendSuccess(res, "Register successfully", response)
})

userRoute.get("/redirect", async (req, res) => {
    const err = redirect_validate(req.query)
    if (err) return sendError(res, err);
    const {
        exp,
        accessToken,
        refreshToken
    } = req.query
    const now = new Date().getTime()
    if (now - exp >= 600000) return res.send(render(path.join(__dirname, '/template/login.html'), {error: 'expired'}))
    if (refreshToken in TOKEN_LIST) return res.send(render(path.join(__dirname, '/template/login.html'), {error: 'used'}))
    const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {complete: true})
    if (ACTIVE_USER.has(payload.user.user_id)) return res.send(render(path.join(__dirname, '/template/login.html'), {error: 'loggedIn'}))
    const response = {
        accessToken, refreshToken
    }
    TOKEN_LIST[refreshToken] = response
    ACTIVE_USER.add(payload.user.user_id)
    return res.send(render(path.join(__dirname, '/template/login.html'), {error: 'false', accessToken, refreshToken}))
});

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

export default userRoute