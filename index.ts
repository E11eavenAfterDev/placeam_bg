
import bodyParser from "body-parser";
// const mongoose = require("mongoose");
import express, { Request, Response , Express,} from 'express';
import mongoose from 'mongoose';

import cors from 'cors';

interface IError extends Error {
    statusCode?: number
}

// const General = require("./routes/general/user")

// const { config } = require("dotenv");
import 'dotenv/config'
import adminroute from "./routes/admin";
import authroute from "./routes/auth";
import userroute from "./routes/user";
import { getCurrentUser } from "./utils/bearerToken";
import productroute from "./routes/product";

const app: Express = express();

// config({ path: "./.env" });


app.use(cors())

const PORT = process.env.PORT || 5000;

////// URL FOR THE PROJECT
const prodUrl = `http://127.0.0.1:${PORT}`;
const liveUrl = `${process.env.currentUrl}:${PORT}`;
const currentUrl = liveUrl || prodUrl;

//// DATABASE URL local: process.env.MONGODB_URI ||| cloud:process.env.databaseUrl
const dbUrl = process.env.databaseUrl || process.env.MONGODB_URI;

// create application/json parser
const jsonParser = bodyParser.json();

app.use(jsonParser);


app.use(getCurrentUser)

app.use("/api/auth", authroute)
app.use("/api/user", userroute)
app.use("/api/admin", adminroute)
app.use("/api/product", productroute)

// suspend account

/**
 * test route
 */
app.get("/", (req, res, next) => {
    // res.status(200).send("API is running");
});



app.use((error:IError, req:Request, res:Response, ) => {
    
    const status: number = error?.statusCode || 500;
    const message = error.message;

    res.status(status).json({ message })
})


mongoose
    .connect(dbUrl!, {
        autoIndex: true
    })
    .then((response) => {
        if (response) {
            app.listen(PORT, () => {
                console.log(`Connected on PORT ${PORT} || ${currentUrl}`);
            });
        }
    })
    .catch((e) => {
        console.log(e);
    });

// Export the Express API
module.exports = app;

