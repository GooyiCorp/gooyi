import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { JWT_EXPIRED, JWT_REFRESH_EXPIRED } from "../../constant/jwt.js";
import { ADMIN } from "../../constant/role.js";
import {
  sendError,
  sendServerError,
  sendSuccess,
} from "../../helper/client.js";
import { logger } from "../../helper/logger.js";
import { TOKEN_LIST } from "../../index.js";
import prisma from "../../prisma/client/index.js";
import {
  admin_login_validate,
  create_admin_validate,
} from "../../validation/admin.js";

const adminRoute = express.Router();

adminRoute.post("/login", async (req, res) => {
  const errors = admin_login_validate(req.body);
  if (errors) return sendError(res, errors);
  const { username, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({
      where: { username: username },
    });
    if (!admin) return sendError(res, "Cut");
    if (!bcrypt.compareSync(password, admin.password))
      return sendError(res, "Wrong password!!!");
    const data = {
      id: admin.admin_id,
      username: admin.username,
      role: ADMIN,
    };
    const accessToken = jwt.sign(
      {
        user: data,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: JWT_EXPIRED,
      },
    );
    const refreshToken = jwt.sign(
      {
        user: data,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: JWT_REFRESH_EXPIRED,
      },
    );

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

adminRoute.post("/create", async (req, res) => {
  const errors = create_admin_validate(req.body);
  if (errors) return sendError(res, errors);
  const { name, username, password } = req.body;
  try {
    const hash = bcrypt.hashSync(password, 10);
    const admin = await prisma.admin.create({
      data: { name, username, password: hash },
    });
    return sendSuccess(res, "Create admin successfully", admin);
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

export default adminRoute;
