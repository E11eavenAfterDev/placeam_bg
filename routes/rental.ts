import express from "express"
import { onlyAdminUser, onlyLoginUser } from "../utils/helper";
import { deleteCategory, getCategory , createCategory, createBanner, deleteBanner, getBanner, createProduct, deleteProduct, getProduct, getProducts} from "../controller/product";
import { multipleupload } from "../middleware/multer";

const rentalroute = express.Router()

rentalroute.get("/category", getCategory)

rentalroute.post("/category",onlyAdminUser, createCategory)
rentalroute.delete("/category/:id", onlyAdminUser, deleteCategory)
// banner
rentalroute.get("/banner", getBanner)
rentalroute.post("/banner", onlyAdminUser, createBanner)
rentalroute.delete("/banner/:id", onlyAdminUser, deleteBanner)


// product
rentalroute.post("/create", onlyLoginUser, multipleupload, createProduct)
rentalroute.delete("/:prodId", onlyLoginUser, deleteProduct)
rentalroute.get("/:prodId", getProduct)
rentalroute.get("/", getProducts)


export default rentalroute;