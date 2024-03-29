import express from "express";
import prisma from "../../prisma/client/index.js";
import {
  generate_store_id,
  sendError,
  sendServerError,
  sendSuccess,
} from "../../helper/client.js";
import {
  store_create_validate,
  upload_image_validate,
} from "../../validation/store.js";
import { logger } from "./../../helper/logger.js";
import { mkdir, rm } from "fs";
import { isNew } from "../../helper/time.js";

const storeRoute = express.Router();

const host = process.env.host;
const port = process.env.PORT;

storeRoute.get("/", async (_, res) => {
  try {
    const stores = await prisma.store.findMany();
    return sendSuccess(res, "Get Stores successfully", stores);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

storeRoute.post("/create", async (req, res) => {
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
  } = req.body;
  const error = store_create_validate(req.body);
  if (error) return sendError(res, error);
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
        store_id,
        name,
        active,
        description,
        enter_date: new Date(enter_date),
        category: {
          connectOrCreate: categories,
        },
        service: {
          connectOrCreate: services,
        },
        status: isNew(enter_date)
          ? {
              connectOrCreate: [
                {
                  where: { name: "Neu" },
                  create: { name: "Neu" },
                },
              ],
            }
          : {},
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
    const address = await prisma.address.create({
      data: {
        store_id: store.store_id,
        longitude,
        latitude,
        street,
        postcode,
        city,
      },
    });
    const openingHour = await prisma.openingHour.create({
      data: { ...opening_hours, store_id: store.store_id },
    });
    await createDefaultGroup(store_id)
    await createDefaultGroupMember(store_id)
    return sendSuccess(res, "Create store successfully", {
      store,
      address,
      openingHour,
    });
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

storeRoute.delete("/:id", async (req, res) => {
  const store_id = req.params.id;
  try {
    await prisma.store.delete({ where: { store_id: store_id } });
    rm(`public/store/${store_id}`, function (err) {
      if (err) return sendError(res, "Cannot delete store's image.");
    });
    return sendSuccess(res, "Delete store successfully");
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

storeRoute.post("/upload", async (req, res) => {
  const error = upload_image_validate(req);
  if (error) return sendError(res, error);

  const { store_id, type } = req.body;
  const image = req.files.image;
  try {
    const store = await prisma.store.findUnique({
      where: { store_id: store_id },
    });

    if (!store) return sendError(res, "No store found");
    image.name = type + ".png";
    mkdir(`public/store/${store_id}`, { recursive: true }, function (err) {
      if (err) return sendError(res, "Cannot upload file.");
    });
    image.mv(`public/store/${store_id}/${image.name}`, function (err) {
      if (err) return sendError(res, "Cannot upload file.");
    });

    return sendSuccess(res, "Upload image successfully!");
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

export default storeRoute;
