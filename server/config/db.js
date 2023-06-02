import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const pool = new pg.Pool({
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_database,
    password: process.env.psql_pass,
    port: process.env.db_port
})

export default pool