import express from "express"
import { getAllPendingRentalProducts, getdonateItem, setRental } from "../controller/admin";

const adminroute = express.Router()


adminroute.get("/donations", getdonateItem)
adminroute.get("/pendingrental", getAllPendingRentalProducts)
adminroute.patch("/rental", setRental)

export default adminroute;