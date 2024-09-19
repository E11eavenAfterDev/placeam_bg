
import bodyParser from "body-parser";
import { v2 as cloudinary } from 'cloudinary';
import express, { Response , Express, NextFunction,} from 'express';
import mongoose from 'mongoose';

import cors from 'cors';

import 'dotenv/config'
import adminroute from "./routes/admin";
import authroute from "./routes/auth";
import userroute from "./routes/user";
import { getCurrentUser } from "./utils/bearerToken";
import productroute from "./routes/product";
import { IRequest } from "./types";

const app: Express = express();


app.use(cors())

const PORT = process.env.PORT || 5000;

////// URL FOR THE PROJECT
const prodUrl = `http://127.0.0.1:${PORT}`;
const liveUrl = `${process.env.currentUrl}:${PORT}`;
const currentUrl = liveUrl || prodUrl;

//// DATABASE URL local: process.env.MONGODB_URI ||| cloud:process.env.databaseUrl
const dbUrl = process.env.databaseUrl || process.env.MONGODB_URI;

// create application/json parser

app.use(bodyParser.urlencoded({
    extended: true
}));
// const jsonParser = bodyParser.json();

app.use(bodyParser.json());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(getCurrentUser)

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET,
    api_key:  process.env.API_KEY
})


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

app.use((error:any, req:IRequest, res:Response, next: NextFunction) => {

    const message = error.message;
    res.json({ message })
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

