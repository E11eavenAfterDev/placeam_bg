
import { Types } from "mongoose";
import KycModel from "../model/kyc"
import User from "../model/user"
import { errorHandler } from "./errorHandler";
// import authToken from "../utils/token";
import authToken from "./token";

import { Response } from 'express';

interface IresponseResult {
    userId: Types.ObjectId
    res: Response
}

export const responseResult = async({userId, res}:IresponseResult) => {

    const user = await User.findById(userId)
    if(!user) return errorHandler(res, 500,"invalid credential" )
    
    const data = await KycModel.findOne({user:user._id}).populate({ path: 'user', select: '-_id -password -public_id' }).select("user kyc_submitted");

    const {token} = await authToken.createToken({email: user.email!, status: user.account_type, userId: user._id.toString()})

    
       res.status(200).json({
           data,
           token
       })
}