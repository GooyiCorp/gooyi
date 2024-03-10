import express from 'express';
import { logger } from '../../helper/logger.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import prisma from '../../prisma/client/index.js';


const groupRoute = express.Router()

groupRoute.get('/', async (req, res) => {
    const mod_id = req.user.id
    try {
        const store = await prisma.store.findMany({
            where: {
                Mod: {
                    some: {
                        mod_id
                    }
                }
            }, 
            select: { CustomerGroup: {
                select: {
                    customer_group_id: true,
                    title: true
                }
            }} })
        const result = store[0].CustomerGroup
        return sendSuccess(res, "ok", result)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})

groupRoute.post('/create', async (req, res) => {
    const mod_id = req.user.id
    const title = req.body.title
    if (!title) return sendError(res, "title must be provided")
    try {
        const mod = await prisma.mod.findUnique({where: {mod_id}, select: {store_id: true}})
        await prisma.CustomerGroup.upsert({
            where: {
                store_id_title: {
                    store_id: mod.store_id,
                    title,
                },
            },
            update: {},
            create: {
                title,
                store: {
                    connect: { store_id: mod.store_id },
                },
            },
        }); 
        return sendSuccess(res, "Create group successfully")
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})


export default groupRoute