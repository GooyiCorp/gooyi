import express from 'express';
import { createDefaultGroup } from '../../helper/store.js';
import { sendServerError } from '../../helper/client.js';

const unitTest = express.Router();

unitTest.get('/', async (req, res) => {
    try {
        return res.send('test');
    } catch (err) {
        return sendServerError(res)
    }
})

export default unitTest