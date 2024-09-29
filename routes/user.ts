import express from "express"
import { updateUser, updateUserAvatar, userBid, userNotifications, userProductStock , userProductSold, userTransaction, userBuyProducts} from "../controller/user";
import { onlyLoginUser } from "../utils/helper";
import { getKyc, updateKyc } from "../controller/kyc";
import { multipleupload, singleupload } from "../middleware/multer";


const userroute = express.Router()

userroute.patch("/update", onlyLoginUser, updateUser)
userroute.get("/kyc", onlyLoginUser, getKyc)
userroute.patch("/kyc", onlyLoginUser, multipleupload, updateKyc)
userroute.patch("/avatar", onlyLoginUser, singleupload, updateUserAvatar)
userroute.get("/notify", onlyLoginUser, singleupload, userNotifications)
userroute.get("/bid", onlyLoginUser, singleupload, userBid)

// product
// userroute.get("/stock", onlyLoginUser, userProductStock)
userroute.get("/stock", onlyLoginUser, userProductStock)
userroute.get("/sold", onlyLoginUser, userProductSold)

// transaction
userroute.post("/buy", onlyLoginUser, userBuyProducts)
userroute.get("/transact", onlyLoginUser, userTransaction)

export default userroute;