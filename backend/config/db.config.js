import dotenv from "dotenv"
dotenv.config()
export const db_config = {
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_database,
    password: process.env.db_password,
    port: 5432
}
