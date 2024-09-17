import express from "express"
import { donateItem, getdonateUserItem, updataUser, updataUserAvatar } from "../controller/user";
import { onlyLoginUser } from "../utils/helper";
import { getKyc, updateKyc } from "../controller/kyc";


const userroute = express.Router()

userroute.patch("/update", onlyLoginUser, updataUser)
userroute.get("/kyc", onlyLoginUser, getKyc)
userroute.patch("/kyc", onlyLoginUser, updateKyc)
userroute.patch("/avatar", onlyLoginUser, updataUserAvatar)
userroute.post("/donation", onlyLoginUser, donateItem)
userroute.get("/donation", onlyLoginUser, getdonateUserItem)




export default userroute;