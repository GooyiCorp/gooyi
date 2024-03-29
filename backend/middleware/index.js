import jwt from "jsonwebtoken";
import { ADMIN, STORE, STORE_ROLE } from "../constant/role.js";
import { sendError } from "../helper/client.js";
import { TOKEN_BLACKLIST, TOKEN_LIST } from "../index.js";
export const verifyToken = async (req, res, next) => {
  try {
    const data = req.headers["authorization"];
    const token = data?.split(" ")[1];
    if (!token) return sendError(res, "jwt must be provided.", 401);

    if (token in TOKEN_LIST || token in TOKEN_BLACKLIST)
      return sendError(res, "Unauthorized.", 401);
    const { payload } = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      complete: true,
    });

    if (!payload.user) return sendError(res, "Unauthorized.", 401);

    req.verifyToken = token;
    req.user = payload.user;
    next();
  } catch (error) {
    return sendError(res, "jwt expired.", 401);
  }
};

export const verifyAdmin = async (req, res, next) => {
  if (req.user.role !== ADMIN) return sendError(res, "Forbidden.", 403);
  next();
};

export const verifyStore = async (req, res, next) => {
  if (req.user.role !== STORE || !(Object.values(STORE_ROLE).includes(req.user.store_role))) return sendError(res, "Forbidden.", 403);
  next();
};
