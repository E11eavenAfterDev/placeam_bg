import express from "express"
import { createUser, loginUser } from "../controller/auth";

const authroute = express.Router()



authroute.post("/register", createUser)
authroute.post("/login", loginUser)




export default authroute;