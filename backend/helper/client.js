import NodeMailer from "nodemailer"
import prisma from '../prisma/client/index.js';
import { logger } from "./logger.js";
import Redis from "../cache/index.js";
import { TODAY_CREATED_STORE, TODAY_CREATED_USERS } from '../constant/others.js';


export const sendSuccess = (res, message, data = null) => {
    let responseJson = {
        success: true,
        message: message
    }
    if (data) responseJson.data = data
    return res.status(200).json(responseJson)
}

export const sendError = (res, message, code = 400) => {
    return res.status(code).json({
        success: false,
        message: message
    })
}

export const sendServerError = res =>
    res.status(500).json({
        success: false,
        message: 'Server Interval Error.'
    })

export const sendAutoMail = async (options) => {
    const transport = NodeMailer.createTransport({
        host: "smtp.ionos.de",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_HOST,
            pass: process.env.PASS_MAIL_HOST
        },
    })
    try {
        await transport.sendMail(options)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export function generate_key(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export async function generate_user_id() {
    try {
        var today = new Date();
        var user_count = await Redis.get(TODAY_CREATED_USERS)
        if (!user_count) {
            await Redis.set(TODAY_CREATED_USERS, 0)
            user_count = 0
        }
        await Redis.incr(TODAY_CREATED_USERS)
        today = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000);
        return `${new Date().getFullYear() - 2024} ${'0'.repeat(3 - today.toString().length)}${today} ${'0'.repeat(5 - user_count.toString().length)}${parseInt(user_count) + 1}`
    } catch (e) {
        logger.error(e);
        return 'error';
    }
}
export async function generate_store_id() {
    try {
        var today = new Date();
        var store_count = await Redis.get(TODAY_CREATED_STORE)
        if (!store_count) {
            await Redis.set(TODAY_CREATED_STORE, 0)
            store_count = 0
        }
        await Redis.incr(TODAY_CREATED_STORE)
        store_count = parseInt(store_count) + 1
        today = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000);
        return `${new Date().getFullYear() - 2024} ${'0'.repeat(3 - today.toString().length)}${today} ${'0'.repeat(3 - store_count.toString().length)}${store_count}`
    } catch (e) {
        logger.error(e);
        throw new Error(`Failed to generate store id: ${e.message}`);
    }
}

export async function generate_coupon_code(id) {
    var code = '';
    for (var i = 0; i < 4; i++) {
        code += `${generate_key(4).toUpperCase()}-`
    }
    if (await Redis.get(code)) {
        return generate_coupon_code()
    }
    await Redis.set(code, id, 'EX', 900)
    return code.slice(0, -1)
}