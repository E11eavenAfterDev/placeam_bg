import express from "express";
import { onlyAdminUser, onlyLoginUser } from "../utils/helper";
import {
  deleteCategory,
  getCategory,
  createCategory,
  createBanner,
  deleteBanner,
  getBanner,
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  createBid,
  changeBidStatus,
  ApprovedBid,
  RejectBid,
} from "../controller/product";
import { multipleupload } from "../middleware/multer";

const productroute = express.Router();

productroute.get("/category", getCategory);

productroute.post("/category", onlyAdminUser, createCategory);
productroute.delete("/category/:id", onlyAdminUser, deleteCategory);
// banner
productroute.get("/banner", getBanner);
productroute.post("/banner", onlyAdminUser, createBanner);
productroute.delete("/banner/:id", onlyAdminUser, deleteBanner);

// product
productroute.post("/create", onlyLoginUser, multipleupload, createProduct);
productroute.delete("/:prodId", onlyLoginUser, deleteProduct);
productroute.get("/:prodId", getProduct);
productroute.get("/", getProducts);

//
productroute.post("/bid", onlyLoginUser, createBid);
productroute.patch("/bid/approve", onlyLoginUser,ApprovedBid, changeBidStatus);
productroute.patch("/bid/reject", onlyLoginUser,RejectBid, changeBidStatus);

export default productroute;
