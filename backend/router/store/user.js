import express from "express";
import { sendError, sendServerError, sendSuccess } from "../../helper/client.js";
import { logger } from "../../helper/logger.js";
import prisma from "../../prisma/client/index.js";

const userRoute = express.Router();

userRoute.put("/add-point", async (req, res) => {
  const store_member_id = req.user.id
  const { user_id, point } = req.body;
  try {
    const member = await prisma.StoreMember.findUnique({where: {store_member_id}, select: {store_id: true}})
    const user = await prisma.user.findUnique({ where: {user_id}, select: {UserPoints: {where: {store_id: member.store_id}}}});
    if (!user) return sendError(res, "No user found")
    await prisma.UserPoint.upsert({
      where: { user_id_store_id: { user_id, store_id: member.store_id } },
      update: { point: { increment: point } },
      create: { store_id: member.store_id, user_id, point }
    });
    await prisma.PointHistory.create({data: {store_id: member.store_id, user_id, point}})
    await prisma.Customer.upsert({where: {user_id_store_id: { user_id, store_id: member.store_id}}, update: {}, create: {user_id, store_id: member.store_id}})
    return sendSuccess(res, "ok")
  } catch (err) {
    logger.error(err);
    return sendServerError(res)
  }
});

export default userRoute;
