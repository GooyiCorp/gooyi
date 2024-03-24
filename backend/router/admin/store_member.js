import bcrypt from "bcrypt";
import express from "express";
import {
  generate_key,
  sendAutoMail,
  sendError,
  sendServerError,
  sendSuccess,
} from "../../helper/client.js";
import { logger } from "../../helper/logger.js";
import prisma from "../../prisma/client/index.js";
import { create_mod_validate } from "../../validation/mod.js";

const storeMemberRoute = express.Router();

storeMemberRoute.post("/create", async (req, res) => {
  const error = create_mod_validate(req.body);
  if (error) return sendError(res, error);
  const { store_id, name, email, phone, role, store_owner } = req.body;
  try {
    const check = await prisma.StoreMember.findMany({
      where: { OR: [{ email, phone }] },
    });
    if (check.lenght > 0) return sendError(res, "Email or Phone exists");
    const store = await prisma.store.findUnique({ where: { store_id } });
    if (!store) return sendError(res, "Store not found");
    const password = generate_key(11);
    const hash = bcrypt.hashSync(password, 10);
    const member = await prisma.StoreMember.create({
      data: { name, email, phone, password: hash, role: role.toUpperCase(), store_owner: store_owner ? true : false, group:
      {
        connect: {
            store_id_name: {
              store_id,
              name: role.toUpperCase(),
            },
          }
        
      },
      store: {
        connect: {
          store_id,
        }
      }
     },
    });
    const options = {
      from: "Gooyi.de <info@gooyi.de>",
      to: email,
      subject: "[Gooyi] Default password",
      html: `<p>Default Password: ${password}</p>`,
    };
    const sendmail = await sendAutoMail(options);
    if (!sendmail) return sendError(res, "Send mail failed");
    return sendSuccess(res, "Create team member successfully", {
      ...member,
      defaultPassword: password,
    });
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

storeMemberRoute.delete("/delete", async (req, res) => {
  const { store_member_id } = req.body;
  try {
    const member = await prisma.StoreMember.findUnique({ where: { store_member_id } });
    if (!member) return sendError(res, "User not found");
    await prisma.StoreMember.delete({ where: { store_member_id } });
    return sendSuccess(res, "Delete user successfully", member);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

export default storeMemberRoute;
