import express from 'express'
import { verifyToken } from './../../middleware/index.js';
import prisma from '../../prisma/client/index.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { logger } from '../../helper/logger.js';
import { email_validate } from '../../validation/user.js';

const find = express.Router()


find.get('/',verifyToken, async (req, res) => {
    
    const { searchString } = req.query
    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const id_pattern = /^\d+$/

    const searchType = email_pattern.test(searchString) ? 'email' : (id_pattern.test(searchString) ? 'id' : 'Error')
    if (searchType === "Error") return sendError(res, "Invalid.")
    try {
        if (searchType === "email") {
            const user = await prisma.user.findMany({where: {email: searchString},  select: {email: true, user_id: true, first_name: true, last_name: true}})
            return sendSuccess(res, "", user)
        } else {
            const user = await prisma.user.findMany({ where: { user_id: parseInt(searchString) }, select: { email: true, user_id: true, first_name: true, last_name: true } })
            return sendSuccess(res, "", user)
        }
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})


export default find