import express from "express";
import jwt from "jsonwebtoken";
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from "../../constant/jwt.js";
import { STORE } from "../../constant/role.js";
import { logger } from "../../helper/logger.js";
import { checkNewStore, checkOpeningStore } from "../../helper/schedule.js";
import { TOKEN_LIST } from "../../index.js";
import prisma from "../../prisma/client/index.js";
import { rm } from 'fs';
import {
  sendError,
  sendServerError,
  sendSuccess,
} from "./../../helper/client.js";


const storeRoute = express.Router();

storeRoute.delete("/delete-stores", async (req, res) => {
  try {
    await prisma.$queryRaw`
            TRUNCATE TABLE "Store" RESTART IDENTITY CASCADE
        `;
    await prisma.$queryRaw`
            TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE
        `;
    rm(`public/store`, function (err) {
      // if (err) return sendError(res, "Cannot delete store's image.")
    });
    return sendSuccess(res, "success");
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});
storeRoute.put("/check-opening", async (req, res) => {
  const result = await checkOpeningStore();
  return sendSuccess(res, "success", result);
});

storeRoute.put("/check-new-store", async (req, res) => {
  const result = await checkNewStore();
  return sendSuccess(res, "success", result);
});

storeRoute.post("/create-mod", async (req, res) => {
  const { store_id, name, phone, email } = req.body;
  try {
    const mod = await prisma.StoreMember.create({
      data: {
        store_id,
        name,
        phone,
        email,
        password: "test",
      },
    });
    return sendSuccess(res, "success", mod);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

storeRoute.post("/mod-login", async (req, res) => {
  const { store_member_id } = req.body;
  try {
    const mod = await prisma.StoreMember.findUnique({ where: { store_member_id } });
    if (!mod) return sendError(res, "No user found");
    const data = {
      id: mod.store_member_id,
      store_id: mod.store_id,
      role: STORE,
    };
    const accessToken = jwt.sign({ user: data }, process.env.JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRED,
    });
    const refreshToken = jwt.sign({ user: data }, process.env.JWT_SECRET_KEY, {
      expiresIn: JWT_REFRESH_EXPIRED,
    });
    const response = {
      accessToken,
      refreshToken,
    };
    TOKEN_LIST[refreshToken] = response;
    return sendSuccess(res, "Login successfully", response);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

export default storeRoute;
