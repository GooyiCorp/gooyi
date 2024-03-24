import express from 'express'
import { logger } from '../../helper/logger.js'
import { sendServerError, sendSuccess } from '../../helper/client.js'
import prisma from '../../prisma/client/index.js'

const notificationRoute = express.Router()

notificationRoute.get("/", async (req, res) => {
  const store_member_id = req.user.id;

  try {
    // Fetch notifications for the member along with their read status
    const notifications = await prisma.notification.findMany({
      where: {
        Stores: {
          some: {
            store: {
              Mod: {
                some: {
                  store_member_id
                }
              }
            }
          }
        }
      },
      include: {
        Stores: {
          where: {
            store: {
              Mod: {
                some: {
                  store_member_id
                }
              }
            }
          },
          select: {
            read: true
          }
        }
      },
      orderBy: {
        created_at: 'desc' // or 'asc' for ascending order
      }
    });
    const formattedNotifications = notifications.map(notification => ({
        text: notification.text,
        created_at: notification.created_at,
        read: notification.Stores[0] ? notification.Stores[0].read : false // Read status, defaulting to false if not present
    }));


    return sendSuccess(res, "Get Notifications Successfully", formattedNotifications);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});


export default notificationRoute