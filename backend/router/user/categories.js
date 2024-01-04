import express from 'express';
import { sendError, sendServerError, sendSuccess } from './../../helper/client.js';
import { find_stores_validate } from '../../validation/store.js';
import { logger } from '../../helper/logger.js';
import prisma from '../../prisma/client/index.js';

const categories = express.Router()


categories.get('/', async (req, res) => {

    const error = find_stores_validate(req.query)
    if (error) return sendError(res, error)

    const { longitude, latitude, radius } = req.query
    if (!radius) radius = 10000

    try {

        const points = await prisma.address.findClosestPoints({ longitude, latitude, radius: parseInt(radius) })
        const ids = points.map(point => point.store_id)

        const stores = await prisma.store.findMany({where: {
                store_id: {
                    in: ids
                }
            },
            select: {
                category: true
            }
        })
        const categoryCounts = {};
        stores.forEach(store => {
            const categories = store.category;
            categories.forEach(category => {
                const { category_id, name } = category;
                if (!categoryCounts[category_id]) {
                    categoryCounts[category_id] = {
                        name,
                        count: 1
                    };
                } else {
                    categoryCounts[category_id].count++;
                }
            });
        });
        const result = Object.values(categoryCounts).sort((a, b) => b.count - a.count).slice(0, 5);
        return sendSuccess(res, "ok", result)


    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }

    
})


export default categories