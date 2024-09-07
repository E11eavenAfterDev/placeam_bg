import express from "express"
import { updataUser } from "../controller/user";
import { onlyLoginUser } from "../utils/helper";
import { getKyc, updateKyc } from "../controller/kyc";


const userroute = express.Router()

userroute.patch("/update", onlyLoginUser, updataUser)
userroute.get("/kyc", onlyLoginUser, getKyc)
userroute.patch("/kyc", onlyLoginUser, updateKyc)




export default userroute;