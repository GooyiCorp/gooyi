import express from 'express';
import { find_stores_validate } from '../../validation/store.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { USER } from '../../constant/role.js';
import { logger } from './../../helper/logger.js';
import { verifyToken } from '../../middleware/index.js';
import prisma from '../../prisma/client/index.js';


const storeRoute = express.Router();


storeRoute.get("/", async (req, res) => {
    const error = find_stores_validate(req.query)
    if  (error) return sendError(res, error);
    const {longitude, latitude, radius} = req.query
    if (!radius) radius = 1000
    try {
        const stores = await prisma.store.findClosestStores({longitude, latitude, radius: parseInt(radius)})
        return sendSuccess(res, "Get Nearby Stores", stores)
    } catch (error) {
        logger.error(error);
        return sendServerError(res, error);
    }
})

storeRoute.get("/find", verifyToken, async (req, res) => {

    const error = find_stores_validate(req.query)
    if  (error) return sendError(res, error);
    
    const {longitude, latitude, radius} = req.query
    const user_id = req.user.id
    if (!radius) radius = 1000
    try {
        const user = await prisma.user.findUnique({where: {user_id}, include: {FavoriteStores: { select: {store_id: true}}}})
        if (!user) return sendError(res, "Unauthorized", 403)
        const favoriteStoreIds = user.FavoriteStores.map((item) => item.store_id);
        const stores = await prisma.store.findClosestStores({longitude, latitude, radius: parseInt(radius)})
        const results = stores.map((item) => ({
            ...item,
            favorite: favoriteStoreIds.includes(item.store_id)
        }));
        return res.send(results)
    } catch (error) {
        logger.error(error);
        return sendServerError(res, error);
    }
})

storeRoute.post("/like", verifyToken, async (req, res) => {
    if (req.user.role !== USER) return sendError(res, "You must be user")
    const {id: user_id} = req.user
    const { store_id } = req.body
    try {
        const user = await prisma.user.findUnique({where: {user_id}, include: {FavoriteStores: true}})
        if (!user) return sendError(res, "Unauthorized", 403)
        const store = await prisma.store.findUnique({where: {store_id}})
        if (!store) return sendError(res, "No store found")
        const check = user.FavoriteStores.some(item => store_id === item.store_id)
        if (check) {
            await prisma.user.update({ where: { user_id }, data: { FavoriteStores: { disconnect: [{store_id}] } } })
            return sendSuccess(res, "Disliked.");

        }
        await prisma.user.update({ where: { user_id }, data: { FavoriteStores: { connect: [{ store_id}] } } })
        return sendSuccess(res, "Liked.");
    } catch (err) {
        logger.error(err);
        return sendServerError(res)
    }
    
})

storeRoute.get('/search', async (req, res) => {
    const error = find_stores_validate(req.query)
    if (error) return sendError(res, error);
    const { longitude, latitude, radius, keyword } = req.query
    try {
        const points = await prisma.address.findClosestPoints({ longitude, latitude, radius: parseInt(radius) })
        const ids = points.map(point => point.store_id)
        let result = await prisma.store.findMany({where: {
            AND: {
                store_id: {
                    in: ids,
                },
                OR: [
                    {name: {
                        contains: keyword,
                        mode: 'insensitive'
                    }},
                    {category: {
                        some: {
                            name: {
                                contains: keyword,
                                mode: 'insensitive'
                            }
                        },
                    }}
                ]
            }
        },
        select: {
            store_id: true,
            name: true,
            category: {
                select: {
                    name: true
                }
            }
        },
        })
        result = result.map(store => {
            const matchingPoint = points.find(point => point.store_id === store.store_id);
            return {
                ...store,
                distance: matchingPoint ? matchingPoint.distance : null,
            };
        });
        result  = result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        return sendSuccess(res, "ok", result)
       
    
    } catch (err) {
        logger.error(err);
        return sendServerError(res);
    }



})

export default storeRoute