import express from 'express';
import { find_stores_validate } from '../../validation/store.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import { USER } from '../../constant/role.js';
import { logger } from './../../helper/logger.js';
import { verifyToken } from '../../middleware/index.js';
import prisma from '../../prisma/client/index.js';
import { isOpening } from '../../helper/time.js';


const storeRoute = express.Router();


storeRoute.get('/info/:id', async (req, res) => {
    const store_id = parseInt(req.params.id)
    if (!store_id) return sendError(res, "Invalid id provided")
    try {
        const store = await prisma.store.findUnique({ where: { store_id }, include: { Address: true, OpeningHour: true, status: true, service: true ,_count: { select: { FavoritedUsers :true}}}})
        const location = await prisma.$queryRaw 
        `
            SELECT ST_X(ST_GeometryN("location"::geometry, 1)) AS longitude, ST_Y(ST_GeometryN("location"::geometry, 1)) AS latitude
            FROM "Address"
            WHERE store_id = ${store_id}
        `
        store.location = location[0]
        store.is_opening = isOpening(store.OpeningHour)
        return sendSuccess(res, "ok", store)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }    
})
storeRoute.get('/loggedin/info/:id', verifyToken, async (req, res) => {
    const user_id = req.user.id
    const store_id = parseInt(req.params.id)
    if (!store_id) return sendError(res, "Invalid id provided")
    try {
        const store = await prisma.store.findUnique({ where: { store_id }, include: { Address: true, OpeningHour: true, status: true,service: true ,_count: { select: { FavoritedUsers :true}}}})
        const location = await prisma.$queryRaw 
        `
            SELECT ST_X(ST_GeometryN("location"::geometry, 1)) AS longitude, ST_Y(ST_GeometryN("location"::geometry, 1)) AS latitude
            FROM "Address"
            WHERE store_id = ${store_id}
        `
        const user = await prisma.user.findUnique({ where: { user_id }, select: { UserPoints: { where: { store_id } } } })
        var point = 0
        if (user.UserPoints.length > 0) point = user.UserPoints[0].point
        store.location = location[0]
        store.point = point
        store.is_opening = isOpening(store.OpeningHour)
        return sendSuccess(res, "ok", store)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }    
})


storeRoute.get("/", async (req, res) => {
    const error = find_stores_validate(req.query)
    if  (error) return sendError(res, error);
    const {longitude, latitude, radius, neu} = req.query
    if (!radius) radius = 10000
    try {
        let stores = await prisma.store.findClosestStores({longitude, latitude, radius: parseInt(radius)})
        if ((/true/i).test(neu)) {
            stores = stores.filter((store) => store.isNew)
        }
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

storeRoute.get('/search', async (req, res) => {
    const error = find_stores_validate(req.query)
    if (error) return sendError(res, error);
    const { longitude, latitude, radius, searchString, category, sort } = req.query
    const filter = (category === '') ? searchString : category.split(',')
    const categoriesFilter = typeof filter != 'string' ? filter.map(item => ({
        category: {
            some: {
                name: {
                    contains: item,
                    mode: 'insensitive'
                }
            }
        }
    })) : {
            category: {
                some: {
                    name: {
                        contains: filter,
                        mode: 'insensitive'
                    }
                }
            }
    }
    try {
        const points = await prisma.address.findClosestPoints({ longitude, latitude, radius: parseInt(radius) })
        const ids = points.map(point => point.store_id)
        let result = await prisma.store.findMany({where: {
            AND: {
                store_id: {
                    in: ids,
                },
                status: sort ? {
                    some: {
                        name: {
                            contains: sort,
                            mode: 'insensitive'
                        },
                    }
                } : {},
                OR: typeof filter != 'string' ? categoriesFilter : [
                    categoriesFilter,
                    {
                        name: {
                            contains: filter,
                            mode: 'insensitive'
                        }
                    }
                ],
                name: typeof filter != 'string' ? {
                    contains: searchString,
                    mode: 'insensitive'
                } : {}
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

storeRoute.post('/feedback', verifyToken, async (req, res) => {
    const { store_id, text } = req.body;
    if (!text || !store_id) return sendError(res, "text and store_id is required")
    const user_id = req.user.id

    try {
        const store = await prisma.store.findUnique({where: {store_id}})
        if (!store) return sendError(res, "Store not found", 403)

        const user = await prisma.user.findUnique({where: {user_id}, select: {
            FeedBacks: {
                where: {store_id},
                orderBy: {
                    create_at: 'desc'
                }
            }
        }})
        if (!user) return sendError(res, "Unauthorized", 403)
        if (user.FeedBacks.length > 0) {
            const last_feedback_date = new Date(user.FeedBacks[0].create_at).getDate()
            const today = new Date().getDate()
            
            if (last_feedback_date === today) return sendError(res, "One Feedback per day", 403)
        }
        const feedback = await prisma.user.update({where: {user_id}, data: {
            FeedBacks: {
                create: {
                    store_id, text   
                }
            }
        }})
        return sendSuccess(res, "Feedback successfully sent")
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})

export default storeRoute