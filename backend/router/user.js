import express from "express";
import { sendSuccess } from "../helper/client.js";
import User from "../model/User.js";

const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
    const user = User.create({first_name: "okdsvs"})
    return sendSuccess(res, "ok")
})


export default userRoute