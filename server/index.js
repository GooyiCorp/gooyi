import express from 'express';
import pool from './config/db.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import { sendAutoMail } from './helper/clients.js';

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.get('/clients', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM clients');
        res.send(results.rows);
    }
    catch (err) {
            console.log(err);
            res.send(err);
    }
});




app.get('/mail', async (req, res) => {
    const options = {
    from: 'Gutchein-App <noreply@example.com>',
    to: "thienthanh04082002@gmail.com",
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