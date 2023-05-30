import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: process.env.psql_pass,
    port: 5432
})

export default pool