import express from "express"
import { onlyLoginUser } from "../utils/helper";
import { multipleupload } from "../middleware/multer";
import { createRental, getRentalProducts } from "../controller/rentals";

const rentalroute = express.Router()

// product
rentalroute.post("/create", onlyLoginUser, multipleupload, createRental)
rentalroute.get("/", getRentalProducts)




// rentalroute.get("/category", getCategory)

// rentalroute.post("/category",onlyAdminUser, createCategory)
// rentalroute.delete("/category/:id", onlyAdminUser, deleteCategory)
// // banner
// rentalroute.get("/banner", getBanner)
// rentalroute.post("/banner", onlyAdminUser, createBanner)
// rentalroute.delete("/banner/:id", onlyAdminUser, deleteBanner)




export default rentalroute;