import express from "express"
import { updataUser } from "../controller/user";
import { onlyLoginUser } from "../utils/isLogin";

const userroute = express.Router()

userroute.patch("/update", onlyLoginUser, updataUser)







export default userroute;