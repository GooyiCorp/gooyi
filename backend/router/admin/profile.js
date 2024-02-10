import express from "express";
import jwt from "jsonwebtoken";

import { sendError, sendSuccess } from "../../helper/client.js";
import { clearTokenList } from "../../helper/jwt.js";
import { TOKEN_BLACKLIST, TOKEN_LIST } from "../../index.js";

const profileRoute = express.Router();

profileRoute.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken in TOKEN_LIST) delete TOKEN_LIST[refreshToken];
  else return sendError(res, "Invalid refresh token");
  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, { complete: true });
  try {
    jwt.verify(req.verifyToken, process.env.JWT_SECRET_KEY, {
      complete: true,
    });
    TOKEN_BLACKLIST[req.verifyToken] = req.verifyToken;
    clearTokenList(TOKEN_BLACKLIST);
  } catch (error) {}
  return sendSuccess(res, "Logged out successfully");
});

export default profileRoute;
