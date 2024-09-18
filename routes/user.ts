import express from "express"
import { donateItem, getdonateUserItem, updateUser, updateUserAvatar } from "../controller/user";
import { onlyLoginUser } from "../utils/helper";
import { getKyc, updateKyc } from "../controller/kyc";
import { singleupload } from "../middleware/multer";


const userroute = express.Router()

userroute.patch("/update", onlyLoginUser, updateUser)
userroute.get("/kyc", onlyLoginUser, getKyc)
userroute.patch("/kyc", onlyLoginUser, updateKyc)
userroute.patch("/avatar", onlyLoginUser, singleupload, updateUserAvatar)
userroute.post("/donation", onlyLoginUser, donateItem)
userroute.get("/donation", onlyLoginUser, getdonateUserItem)




export default userroute;