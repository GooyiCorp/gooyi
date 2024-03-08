import express from 'express'
import prisma from '../../prisma/client/index.js';
import { sendServerError, sendSuccess } from '../../helper/client.js';
import { logger } from '../../helper/logger.js';
import { verifyToken } from '../../middleware/index.js';

const notificationRoute = express.Router()

notificationRoute.get("/", verifyToken, async (req, res) => {
    const user_id = req.user.id;
    try {
        const notifications = await prisma.userNotification.findMany({
            where: {
                user_id
            },
            include: {
                notification: {
                    select: {
                        text: true,
                        create_at: true
                    }
                }
            },
            orderBy: {
                notification: {
                    create_at: 'desc'
                }
            }
        });
        return sendSuccess(res, "Get Notification Successfully", notifications.map(({ notification }) => notification));
    } catch (err) {
        logger.error(err);
        return sendServerError(res);
    }
});

export default notificationRoute