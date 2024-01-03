import express from 'express'
import { verifyToken } from './../../middleware/index.js';

const find = express.Router()


find.get('/',verifyToken, async (req, res) => {
    console.log(req.user);
    return res.send("ok")
})


export default find