import express from "express";
import {
  generate_coupon_code,
  sendError,
  sendServerError,
  sendSuccess,
} from "../../helper/client.js";
import { logger } from "../../helper/logger.js";
import { verifyToken } from "../../middleware/index.js";
import prisma from "../../prisma/client/index.js";

const couponRoute = express.Router();

couponRoute.get("/", verifyToken, async (req, res) => {
  const user_id = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { user_id },
      include: { coupons: true },
    });
    if (!user) return sendError(res, "User not found", 403);
    return sendSuccess(res, "User coupons", user.coupons);
  } catch (error) {
    logger.error(error);
    return sendServerError(res);
  }
});

// couponRoute.post("/redeem", verifyToken, async (req, res) => {
//   const { coupon_id } = req.body;
//   const user_id = req.user.id;
//   try {
//     const coupon = await prisma.coupon.findUnique({ where: { coupon_id } });
//     if (!coupon) return sendError(res, "Coupon not found", 404);

//     const code = await generate_coupon_code(coupon_id);
//     return sendSuccess(res, "Coupon redeemed", { code });
//   } catch (error) {
//     logger.error(error);
//     return sendServerError(res);
//   }
// });

export default couponRoute;
