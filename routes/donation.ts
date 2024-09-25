import express from "express"

import { onlyLoginUser } from "../utils/helper";
import { donateItem, donateItemReceived, getdonateItems, getdonateUserItem , singledonateUserItem} from "../controller/donation";

const donationroute = express.Router()

donationroute.post("/", onlyLoginUser, donateItem)
donationroute.get("/user", onlyLoginUser, getdonateUserItem)
donationroute.get("/", onlyLoginUser, getdonateItems)
donationroute.get("/:id", onlyLoginUser, singledonateUserItem)
donationroute.patch("/:id", onlyLoginUser, donateItemReceived)




export default donationroute;