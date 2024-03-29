import Redis from "../cache/index.js";
import {
  TODAY_CREATED_STORE,
  TODAY_CREATED_USERS,
} from "../constant/others.js";
import prisma from "../prisma/client/index.js";
import { logger } from "./logger.js";
import { isNew, isOpening } from "./time.js";

export async function checkOpeningStore() {
  try {
    const stores = await prisma.store.findMany({
      select: { OpeningHour: true },
    });
    const hours = stores.map((store) => store.OpeningHour);

    for (const hour of hours) {
      if (isOpening(hour)) {
        await prisma.store.update({
          where: { store_id: hour.store_id },
          data: {
            status: {
              connectOrCreate: [
                {
                  where: { name: "Geöffnet" },
                  create: { name: "Geöffnet" },
                },
              ],
            },
          },
        });
      } else {
        await prisma.store.update({
          where: { store_id: hour.store_id },
          data: {
            status: {
              disconnect: [{ name: "Geöffnet" }],
            },
          },
        });
      }
    }

    return true;
  } catch (err) {
    logger.error(err);
  }
}

export async function checkNewStore() {
  try {
    const stores = await prisma.store.findMany({
      select: { enter_date: true, store_id: true },
    });
    for (const store of stores) {
      if (isNew(store.enter_date)) {
        await prisma.store.update({
          where: { store_id: store.store_id },
          data: {
            status: {
              connectOrCreate: [
                {
                  where: { name: "Neu" },
                  create: { name: "Neu" },
                },
              ],
            },
          },
        });
      } else {
        await prisma.store.update({
          where: { store_id: store.store_id },
          data: {
            status: {
              disconnect: [{ name: "Neu" }],
            },
          },
        });
      }
    }
    return true;
  } catch (err) {
    logger.error(err);
  }
}

export async function reset_day_count() {
  await Redis.set(TODAY_CREATED_USERS, 0);
  await Redis.set(TODAY_CREATED_STORE, 0);
}
