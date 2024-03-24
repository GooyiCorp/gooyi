import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import {
  sendError,
  sendServerError,
  sendSuccess,
} from "../../helper/client.js";
import { logger } from "../../helper/logger.js";
import { TOKEN_BLACKLIST, TOKEN_LIST } from "../../index.js";
import prisma from "../../prisma/client/index.js";
import { mod_password_validate } from "../../validation/mod.js";

const profileRoute = express.Router();

profileRoute.put("/register", async (req, res) => {
  const { password } = req.body;
  const store_member_id = req.user.id;
  const error = mod_password_validate(password);
  if (error) return sendError(res, error);
  try {
    const member = await prisma.StoreMember.findUnique({ where: { store_member_id } });
    if (!member) return sendError(res, "Not Found");
    const hash = bcrypt.hashSync(password, 10);
    await prisma.StoreMember.update({
      where: { store_member_id },
      data: { password: hash, verified: true },
    });
    return sendSuccess(res, "Register successfully");
  } catch (err) {
    logger.error(err);
    return sendServerError(res);
  }
});

profileRoute.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken in TOKEN_LIST) delete TOKEN_LIST[refreshToken];
  else return sendError(res, "Invalid refresh token");
  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, {
    complete: true,
  });
  try {
    jwt.verify(req.verifyToken, process.env.JWT_SECRET_KEY, {
      complete: true,
    });
    TOKEN_BLACKLIST[req.verifyToken] = req.verifyToken;
    clearTokenList(TOKEN_BLACKLIST);
  } catch (error) {}
  return sendSuccess(res, "Logged out successfully");
});

profileRoute.get("/point-history", async (req, res) => {
  console.log(req.user);
  const store_member_id = req.user.id
  try {
    const member = await prisma.StoreMember.findUnique({ where: { store_member_id }, select: { store_id: true } })
    if (!member) return sendError(res, "Not Found")
    const history = await prisma.PointHistory.findMany({where: {store_id: member.store_id}, orderBy: {created_at: 'desc'}})
    return sendSuccess(res, "ok", member)
  } catch (err) {
    logger.error(err)
    return sendServerError(res)
  }
})

export default profileRoute;
