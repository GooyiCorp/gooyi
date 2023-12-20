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
        const result = stores.map(item => {
            item.favorite = false
            return item
        })
        return sendSuccess(res, "Get Nearby Stores", result)
    } catch (error) {
        logger.error(error);
        return sendServerError(res, error);
    }
})

storeRoute.get("/find", verifyToken,async (req, res) => {

    const error = find_stores_validate(req.query)
    if  (error) return sendError(res, error);
    
    const {longitude, latitude, radius} = req.query
    const user_id = req.user.id
    if (!radius) radius = 1000
    try {
        const user = await prisma.user.findUnique({where: {user_id}, include: {FavoriteStores: true}})
        
        const FavoriteStores = []
        user.FavoriteStores.forEach((item) => { FavoriteStores.push(item.store_id) })

        const stores = await prisma.store.findClosestStores({longitude, latitude, radius: parseInt(radius)})
        const results = stores.map((item) => {
            if (FavoriteStores.includes(item.store_id)) item.favorite = true
            else item.favorite = false
            return item
        })
        return res.send(results)
    } catch (error) {
        logger.error(error);
        return sendServerError(res, error);
    }
})

storeRoute.post("/like", verifyToken, async (req, res) => {
    if (req.user.role !== USER) return sendError(res, "You must be user")

    const user_id = req.user.id
    const store_id = req.body.store_id
    try {
        const user = await prisma.user.findUnique({where: {user_id}, include: {FavoriteStores: true}})
        const store = await prisma.store.findUnique({where: {store_id}})
        if (!store) return sendError(res, "No store found")

        let FavoriteStores = [] 
        user.FavoriteStores.forEach((item) => { FavoriteStores.push({store_id: item.store_id})})

        const check = FavoriteStores.map(item => item.store_id).includes(store_id)
        if (check) {
            FavoriteStores = FavoriteStores.filter(item => item.store_id != store_id)
            await prisma.user.update({ where: { user_id }, data: { FavoriteStores: { set: [...FavoriteStores] } } })
            return sendSuccess(res, "Disliked.");

        }

        await prisma.user.update({ where: { user_id }, data: { FavoriteStores: {set: [... FavoriteStores, {store_id}]}}})
        return sendSuccess(res, "Liked.");
    } catch (err) {
        console.log(err);
        return sendServerError(res)
    }
    
})

export default storeRoute