
import express from 'express'
import { logger } from '../../helper/logger.js'
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js'
import prisma from '../../prisma/client/index.js'
import { update_opening_hour_validate } from '../../validation/store.js'

const openingHours = express.Router()

openingHours.put('/', async (req, res) => {
    const error = update_opening_hour_validate(req.body)
    if (error) return sendError(res, error)
    const { store_id, timeString, day } = req.body
    const update = {}
    update[day] = timeString
    try {
        const store = await prisma.store.findUnique({where: {store_id: store_id}})
        if (!store) return sendError(res, "Store not found")
        await prisma.OpeningHour.update({where: {store_id: store_id}, data: update})
        return sendSuccess(res, "Update successfully", store)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})



export default openingHours