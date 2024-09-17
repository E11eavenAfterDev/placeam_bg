import express from "express"
import { getdonateItem } from "../controller/admin";

const adminroute = express.Router()


adminroute.get("/donations", getdonateItem)

export default adminroute;