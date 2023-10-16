import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import bodyParser from "body-parser"
import path from "path"
export const __dirname = path.resolve(path.dirname(''))
dotenv.config()

import sequelize from "./model/index.js";
import userRoute from "./router/user.js";


export const TOKEN_LIST = {}
export const TOKEN_BLACKLIST = {}

try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    // await sequelize.sync({ force: true });
    // console.log("All models were synchronized successfully.");
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('[:date] :method :url :status :res[content-length] - :response-time ms'))


app.use("/api/user", userRoute)
app.use("/api/test", (req, res) => {
    res.send({
        "message": "ok",
    })
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Listening on port 8000");
})