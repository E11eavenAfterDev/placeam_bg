import KycModel from "../model/kyc"
import User from "../model/user"
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs"
import authToken from "../utils/token";


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {
        email,
        fullname,
        password,
        phone_number
    } = req.body
   

    try {

        


        const isRegisterUser = await User.findOne({email})

        if(isRegisterUser) return errorHandler(res, 500,"user with the email already exist." )


            const hashedPassword = await bcrypt.hash(password, 12);


        const user = await User.create({
            account_type: "User",
            email,
            fullname,
            password: hashedPassword,
            phone_number,
            verify_account: true
        })

        if(!user) return errorHandler(res, 500,"failed" )


     const kyc =  new KycModel({_id:user._id,  user: user._id})

     await kyc.save()


     const data = await KycModel.findOne({user:user._id}).populate({ path: 'user', select: '-_id -password' });

    const token  = authToken.createToken({email: user.email!, status: user.account_type, userId: user._id.toString()})

     
        res.status(200).json({
            data,
            token
        })


    } catch (error:any) {
        next(error)
    }

}


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {
        email,
        password
    } = req.body
   

    try {

        const user = await User.findOne({email});

        if(!user) return errorHandler(res, 500," Not a register user." )


        const isEqual = await bcrypt.compare(password, user.password);


        // const isRegisterUser = await User.findOne({email, password})

        if(!isEqual) return errorHandler(res, 500,"Invalid credential" )


     const data = await KycModel.findOne({user:user._id}).populate({ path: 'user', select: '-_id -password' });

        res.status(200).json({
            data
        })


    } catch (error:any) {
        next(error)
    }

}



