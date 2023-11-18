import express from "express"
import { ACTIVE_USER } from "../../index.js";
import { sendError, sendServerError, sendSuccess } from "../../helper/client.js";
import { register_validate } from "../../validation/user.js";
import { logger } from "../../helper/logger.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    const { email, phone } = req.query
    try {
        if (email) {
            const user = await prisma.user.findUnique({where: {email: email}})
            if (user) return sendSuccess(res, "Get user information", user)
            return sendError(res, "No user found")
        }
        else if (phone) {
            const user = await prisma.user.findUnique({where: {phone: phone}})
            if (user) return sendSuccess(res, "Get user information", user)
            return sendError(res, "No user found")
        }
        
        const users = await prisma.user.findMany();
        return sendSuccess(res, "Get users information", users)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})
userRoute.get('/active', async (req, res) => {
    try {
        const result = []
        for (const user_id in ACTIVE_USER) {
            result.push({
                id: user_id,
                name:ACTIVE_USER[user_id].name
            })
        }
        return sendSuccess(res, "Get active user", result)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
    
})

userRoute.post('/create', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone,
    } = req.body
    // const err = register_validate({ first_name, last_name, email, phone })
    // if (err) return sendError(res, err)
    try {
        if (email) {
            const user = await prisma.user.findUnique({ where: { email: email } })
            if (user) return sendError(res, "This user already exists")
        } else {
            const user = await prisma.user.findUnique({ where: { phone: phone } })
            if (user) return sendError(res, "This user already exists")
        }
    } catch (err) {
        logger.error(err)
        sendServerError(res)
    }
    try {
        const user = await prisma.user.create({ data: { first_name, last_name, email, phone, active: true }})
        return sendSuccess(res, "Create user successfully", { user })
    }
    catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
})

userRoute.delete("/delete", async (req, res) => {
    const { email, phone } = req.query
    try {
        if (email) {
            const user = await prisma.user.findUnique({ where: { email: email } })
            if (!user) return sendError(res, "No user found")
            await prisma.user.delete({where: { email: email}})
        }
        else if (phone) {
            const user = await prisma.user.findUnique({ where: { phone: phone } })
            if (!user) return sendError(res, "No user found")
            await prisma.user.delete({where: { phone: phone}})
        }
        return sendSuccess(res, "Delete user successfully")
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})

export default userRoute