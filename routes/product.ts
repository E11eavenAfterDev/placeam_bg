import express from "express"
import { onlyAdminUser, onlyLoginUser } from "../utils/helper";
import { deleteCategory, getCategory , createCategory, createBanner, deleteBanner, getBanner, createProduct, deleteProduct, getProduct, getProducts} from "../controller/product";

const productroute = express.Router()

productroute.get("/category", getCategory)

productroute.post("/category",onlyAdminUser, createCategory)
productroute.delete("/category/:id", onlyAdminUser, deleteCategory)
// banner
productroute.get("/banner", getBanner)
productroute.post("/banner", onlyAdminUser, createBanner)
productroute.delete("/banner/:id", onlyAdminUser, deleteBanner)


// product
productroute.delete("/:prodId", deleteProduct)
productroute.get("/:prodId", getProduct)
productroute.post("/", createProduct)
productroute.get("/", getProducts)


export default productroute;