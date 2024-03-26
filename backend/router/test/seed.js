import express from 'express';
import bcrypt from "bcrypt";

import prisma from '../../prisma/client/index.js';

import { logger } from '../../helper/logger.js';
import { store_create_validate } from "../../validation/store.js";
import { createDefaultGroup, createDefaultGroupMember, createDefaultPermission } from "../../helper/store.js";
import { generate_store_id, generate_user_id, sendServerError, sendSuccess } from '../../helper/client.js';

import stores from "./store_data.json" assert { type: "json" };


const seed = express.Router()

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
    await createDefaultGroupMember(store_id)
  } catch (err) {
    return logger.error(err);
  }
}

seed.post("/", async (req, res) => {
    // Create Stores
    // try {
    //     for (const store of stores) {
    //         await createStore(store);
    //     }
    // } catch (err) {
    //     logger.error("Store:", err);
    //     return sendServerError(res);
    // }
    // Create Store Group Permissions
    try {
      await createDefaultPermission(); 
    } catch (err) {
        logger.error("Store Group Permission:", err);
        return sendServerError(res);
    }
    // Create admin
    try {
        const hash = bcrypt.hashSync("12345", 10);
        await prisma.admin.upsert({
            create: { name: "Thanh", username: "admin", password: hash },
            where: { username: "admin" },
            update: {}
        });
    } catch (err) {
        logger.error("Admin:", err);
        return sendServerError(res);
    }
    // Create sample users
    // try {
    //   const user_id_1 = await generate_user_id();
    //   const user1 = await prisma.user.create({
    //       data: {
    //           user_id: user_id_1,
    //           first_name: "Thanh",
    //           last_name: "Nguyen",
    //           email: "thanhoilathanh482@gmail.com",
    //           phone: "123456",
    //           active: true,
    //       }
    //   })
    // } catch (err) {
    //   logger.error("User:", err);
    //   return sendServerError(res);
    // }
    return sendSuccess(res, "Seed data successfully!");
});




export default seed