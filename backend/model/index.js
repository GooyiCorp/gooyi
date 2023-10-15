import { Sequelize } from "sequelize";
import { db_config } from "../config/db.config.js";
const {
    user,
    host,
    database,
    password,
    port
} = db_config
const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:${port}/${database}`)
export default sequelize 