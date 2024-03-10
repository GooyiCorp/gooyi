import express from "express";
import { rm } from "fs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from "../../constant/jwt.js";
import { STORE } from "../../constant/role.js";
import { logger } from "../../helper/logger.js";
import { checkNewStore, checkOpeningStore } from "../../helper/schedule.js";
import { TOKEN_LIST } from "../../index.js";
import prisma from "../../prisma/client/index.js";
import { store_create_validate } from "../../validation/store.js";
import {
  generate_store_id,
  sendError,
  sendServerError,
  sendSuccess,
} from "./../../helper/client.js";
import stores from "./store_data.json" assert { type: "json" };
import { createDefaultGroup } from "../../helper/store.js";

const storeRoute = express.Router();

const host = process.env.host;
const port = process.env.PORT;
async function createStore(store) {
  const error = store_create_validate(store);
  if (error) return error;
  const {
    name,
    category,
    active,
    description,
    enter_date,
    longitude,
    latitude,
    street,
    postcode,
    city,
    opening_hours,
    service,
  } = store;
  try {
    const categories = category.map((item) => {
      return {
        where: { name: item.charAt(0).toUpperCase() + item.slice(1) },
        create: { name: item.charAt(0).toUpperCase() + item.slice(1) },
      };
    });
    const services = service.map((item) => {
      return {
        where: { name: item.charAt(0).toUpperCase() + item.slice(1) },
        create: { name: item.charAt(0).toUpperCase() + item.slice(1) },
      };
    });
    const store_id = await generate_store_id();
    const store = await prisma.store.create({
      data: {
        name,
        active,
        description,
        enter_date: new Date(enter_date),
        store_id,
        category: {
          connectOrCreate: categories,
        },
        service: {
          connectOrCreate: services,
        },
      },
    });
    await prisma.store.update({
      where: { store_id: store.store_id },
      data: {
        logo: encodeURI(
          `http://${host}:${port}/store/${store.store_id}/logo.png`,
        ),
        background: encodeURI(
          `http://${host}:${port}/store/${store.store_id}/background.png`,
        ),
      },
    });
    await prisma.address.create({
      data: {
        store_id: store.store_id,
        longitude,
        latitude,
        street,
        postcode,
        city,
      },
    });
    await prisma.openingHour.create({
      data: { ...opening_hours, store_id: store.store_id },
    });
    await createDefaultGroup(store_id)
  } catch (err) {
    return logger.error(err);
  }
}

storeRoute.post("/create-stores", async (req, res) => {
  try {
    for (const store of stores) {
      await createStore(store);
    }
    return sendSuccess(res, "ok");
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

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
    const mod = await prisma.mod.create({
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
  const { mod_id } = req.body;
  try {
    const mod = await prisma.mod.findUnique({ where: { mod_id } });
    if (!mod) return sendError(res, "No user found");
    const data = {
      id: mod.mod_id,
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
