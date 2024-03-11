import express from "express";
import { sendError, sendServerError, sendSuccess } from "../../helper/client.js";
import { logger } from "../../helper/logger.js";
import prisma from "../../prisma/client/index.js";

const userRoute = express.Router();

userRoute.put("/add-point", async (req, res) => {
  const mod_id = req.user.id
  const { user_id, point } = req.body;
  try {
    const mod = await prisma.mod.findUnique({where: {mod_id}, select: {store_id: true}})
    const user = await prisma.user.findUnique({ where: {user_id}, select: {UserPoints: {where: {store_id: mod.store_id}}}});
    if (!user) return sendError(res, "No user found")
    await prisma.UserPoint.upsert({
      where: { user_id_store_id: { user_id, store_id: mod.store_id } },
      update: { point: { increment: point } },
      create: { store_id: mod.store_id, user_id, point }
    });
    await prisma.PointHistory.create({data: {store_id: mod.store_id, user_id, point}})
    await prisma.Customer.upsert({where: {user_id_store_id: { user_id, store_id: mod.store_id}}, update: {}, create: {user_id, store_id: mod.store_id}})
    return sendSuccess(res, "ok")
  } catch (err) {
    logger.error(err);
    return sendServerError(res)
  }
});

export default userRoute;
