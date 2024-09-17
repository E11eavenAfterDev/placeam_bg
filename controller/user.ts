import KycModel from "../model/kyc"
import User from "../model/user"
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs"
import authToken from "../utils/token";
import { IRequest } from "../types";
import { responseResult } from "../utils/response";


export const updataUser = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        email,
        fullname,
        phone_number
    } = req.body

    try {
       
        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const user = await User.findById(req?.payload.userId)

        if(!user) return errorHandler(res, 500,"failed" )

        user.email = email
        user.fullname = fullname
        user.phone_number = phone_number
        user.save()

        await responseResult({res, userId: user._id})

    } catch (error:any) {
        next(error)
    }

}


