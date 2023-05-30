import express from 'express';
import pool from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express();



app.get('/', async (req, res) => {
    pool.query(`select * from clients`, (err, result) => {
       if (err) {
           throw err
       }
       res.status(200).json(result.rows)
   })
})



const port = process.env.PORT;

app.listen(port, () => {
    console.log('Listening on port ' + port )
})