import express from 'express';
import jwt from "jsonwebtoken"
import { TOKEN_BLACKLIST, TOKEN_LIST } from '../index.js';
import { JWT_EXPIRED } from '../constant/jwt.js';
import { sendError, sendSuccess } from '../helper/client.js';
const authRoute = express.Router();

authRoute.post('/verify-token', (req, res) => {
    const { accessToken, refreshToken } = req.body
    try {
        if (accessToken in TOKEN_LIST || accessToken in TOKEN_BLACKLIST) return sendError(res, "Unauthorzied.", 401)
        const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        return sendSuccess(res, "Verify token successfully.", {
            user: payload.user
        })
    }
    catch (error) {
        if (refreshToken && refreshToken in TOKEN_LIST) {
            try {
                jwt.verify(TOKEN_LIST[refreshToken].accessToken, process.env.JWT_SECRET_KEY, {
                    complete: true
                })
                return sendError(res, "Unauthorzied.", 401)
            }
            catch (error) {
                try {
                    const { payload } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, {
                        complete: true
                    })
                    const newAccessToken = jwt.sign(
                        {
                            user: payload.user
                        },
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: JWT_EXPIRED
                        }
                    )
                    TOKEN_LIST[refreshToken].accessToken = newAccessToken

                    return sendSuccess(res, "Verify token successfully.", {
                        accessToken: newAccessToken,
                        user: payload.user
                    })
                } catch (error) {
                    delete TOKEN_LIST[refreshToken]
                    return sendError(res, "Unauthorzied.", 401)
                }
            }
        }
        else {
            // console.log('access-token is expired.')
            return sendError(res, "Unauthorzied.", 401)
        }
    }
})


export default authRoute