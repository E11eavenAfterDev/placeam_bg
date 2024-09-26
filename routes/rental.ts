import express from "express"
import { onlyLoginUser } from "../utils/helper";
import { multipleupload } from "../middleware/multer";
import { createRental, getRentalProducts } from "../controller/rentals";

const rentalroute = express.Router()

// product
rentalroute.post("/create", onlyLoginUser, multipleupload, createRental)
rentalroute.get("/", getRentalProducts)


export default rentalroute;