import express from "express";
import jwt from "jsonwebtoken";
import { sendAutoMail, sendError, sendServerError, sendSuccess } from "../helper/client.js";
import { email_validate, register_validate } from "../validation/user.js";
import User from "../model/User.js";
import { USER } from "../constant/role.js";
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from "../constant/jwt.js";
import { TOKEN_LIST } from "../index.js";

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
    // email = email.toLowerCase()
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
            const response = {
                accessToken, refreshToken
            }
            TOKEN_LIST[refreshToken] = response
            // Email
            const options = {
                from: "Gooooooyi",
                to: email,
                subject: '[noreply - Gooyi] Log in ',
                html: `<a href="exp://192.168.0.224:19000">Sign in by this link</a>`
            }
            const sendmail = await sendAutoMail(options)
            if (!sendmail) return sendError(res, "Send mail failed")

            return sendSuccess(res, "Login email sent successfully", response)
        }
        else {
            const options = {
                from: "Gooooooyi",
                to: email,
                subject: '[Gooyi] Register',
                html: `<a href="google.com"></a>`
            }
            return sendSuccess(res, "Register Email sent successfully")
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


export default userRoute