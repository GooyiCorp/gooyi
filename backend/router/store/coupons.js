import express from "express";
import {
  sendError,
  sendServerError,
  sendSuccess,
} from "../../helper/client.js";
import { logger } from "../../helper/logger.js";
import prisma from "../../prisma/client/index.js";
import { create_coupon_validate } from "../../validation/coupon.js";

const couponRoute = express.Router();

/**
 * Creates a new coupon in the database
 */

couponRoute.post("/create", async (req, res) => {
  const {
    title,
    start_date,
    end_date,
    expired_in,
    description,
    amount,
    coupon_priorities,
    coupon_categories,
  } = req.body;
  const { store_id } = req.user;
  const error = create_coupon_validate(req.body);
  if (error) return sendError(res, error);
  try {
    const store = await prisma.store.findUnique({ where: { store_id } });
    if (!store) return sendError(res, "No store found");
    const coupon = await prisma.coupon.create({
      data: {
        title,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        expired_in: parseInt(expired_in),
        description,
        amount: parseInt(amount),
        store_id,
        priorities: {
          connectOrCreate: coupon_priorities.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
        categories: {
          connectOrCreate: coupon_categories.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });
    return sendSuccess(res, "Create coupon successfully", coupon);
  } catch (error) {
    logger.error(error);
    return sendServerError(res);
  }
});

export default couponRoute;
