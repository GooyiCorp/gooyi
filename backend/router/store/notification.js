import express from 'express'
import { logger } from '../../helper/logger.js'
import { sendServerError, sendSuccess } from '../../helper/client.js'
import prisma from '../../prisma/client/index.js'

const notificationRoute = express.Router()

notificationRoute.get("/", async (req, res) => {
    const mod_id = req.user.id
    try {
        const notifications = await prisma.notification.findMany({
            where: {
                Stores: {
                    some: {
                        store: {
                            Mod: {
                                some: {
                                    mod_id
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                create_at: 'desc'
            },
            select: {
                text: true,
                create_at: true
            }
        });

        return sendSuccess(res, "Get Notifications Successfully", notifications)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})

export default notificationRoute