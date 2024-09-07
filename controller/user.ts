import KycModel from "../model/kyc"
import User from "../model/user"
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs"
import authToken from "../utils/token";
import { IRequest } from "../types";


export const updataUser = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        email,
        fullname,
        phone_number
    } = req.body

   

    try {

       
        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const isRegisterUser = await User.findById(req?.payload.userId)

        if(!isRegisterUser) return errorHandler(res, 500,"invalid credential" )


        const user = await User.findById(req?.payload.userId)

        if(!user) return errorHandler(res, 500,"failed" )

        user.email = email
        user.fullname = fullname
        user.phone_number = phone_number
        user.save()

     

     const data = await KycModel.findOne({user:user._id}).populate({ path: 'user', select: '-_id -password' });

     const {token} = await authToken.createToken({email: user.email!, status: user.account_type, userId: user._id.toString()})

     
        res.status(200).json({
            data,
            token
        })


    } catch (error:any) {
        next(error)
    }

}
