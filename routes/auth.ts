import express from "express"
import { createUser, loginUser , changeUserPassword} from "../controller/auth";
import { onlyLoginUser } from "../utils/helper";

const authroute = express.Router()

authroute.post("/register", createUser)
authroute.post("/login", loginUser)
authroute.patch("/changepassword", onlyLoginUser, changeUserPassword)




export default authroute;