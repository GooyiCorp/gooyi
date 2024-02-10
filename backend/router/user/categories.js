import express from "express";
import { logger } from "../../helper/logger.js";
import prisma from "../../prisma/client/index.js";
import { find_stores_validate } from "../../validation/store.js";
import {
  sendError,
  sendServerError,
  sendSuccess,
} from "./../../helper/client.js";

const categories = express.Router();

categories.get("/", async (req, res) => {
  const error = find_stores_validate(req.query);
  if (error) return sendError(res, error);

  const { longitude, latitude, radius } = req.query;
  if (!radius) radius = 10000;

  try {
    const points = await prisma.address.findClosestPoints({
      longitude,
      latitude,
      radius: parseInt(radius),
    });
    const ids = points.map((point) => point.store_id);

    const stores = await prisma.store.findMany({
      where: {
        store_id: {
          in: ids,
        },
      },
      select: {
        category: true,
      },
    });
    const categoryCounts = {};
    stores.forEach((store) => {
      const categories = store.category;
      categories.forEach((category) => {
        const { category_id, name } = category;
        if (!categoryCounts[category_id]) {
          categoryCounts[category_id] = {
            name,
            count: 1,
          };
        } else {
          categoryCounts[category_id].count++;
        }
      });
    });
    const result = Object.values(categoryCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    return sendSuccess(res, "ok", result);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

categories.get("/store", async (req, res) => {
  const error = find_stores_validate(req.query);
  if (error) return sendError(res, error);
  const { name, longitude, latitude, radius } = req.query;
  if (!radius) radius = 10000;
  console.log(name);
  try {
    const points = await prisma.address.findClosestPoints({
      longitude,
      latitude,
      radius: parseInt(radius),
    });
    const ids = points.map((point) => point.store_id);
    let result = await prisma.store.findMany({
      where: {
        store_id: {
          in: ids,
        },
        category: {
          some: {
            name,
          },
        },
      },
    });
    result = result.map((store) => {
      const matchingPoint = points.find(
        (point) => point.store_id === store.store_id,
      );
      return {
        ...store,
        distance: matchingPoint ? matchingPoint.distance : null,
      };
    });
    result = result.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    return sendSuccess(res, "ok", result);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});
export default categories;
