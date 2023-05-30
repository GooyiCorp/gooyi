import express from 'express';
import pool from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

import { sendAutoMail } from './helper/clients.js';

const app = express();


app.get('/', async (req, res) => {
    const options = {
    from: 'Gutchein-App <noreply@example.com>',
    to: "ducanh.95vn@icloud.com",
    subject: "Test email sending", // Subject line
    text: "Sehr geehrte Damen und Herren"  
    }
    const success = await sendAutoMail(options);
    if (success) res.send('Email sent');
    else res.send('Email not sent');
})



const port = process.env.PORT;

app.listen(port, () => {
    console.log('Listening on port ' + port )
})