import dotenv from "dotenv"
import pg from "pg";
const {Pool} = pg;
dotenv.config()
export const db_config = {
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_database,
    password: process.env.db_password,
    port: 5432
}
export const pool = new Pool(db_config)