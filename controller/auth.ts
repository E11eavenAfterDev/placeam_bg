import KycModel from "../model/kyc"
import User from "../model/user"
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs"
import { IRequest } from "../types";
import { responseResult } from "../utils/response";


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {
        email,
        fullname,
        password,
        phone_number
    } = req.body


    try {

        const isRegisterUser = await User.findOne({ email })

        if (isRegisterUser) return errorHandler(res, 500, "user with the email already exist.")


        const hashedPassword = await bcrypt.hash(password, 12);


        const user = await User.create({
            account_type: "User",
            email,
            fullname,
            password: hashedPassword,
            phone_number,
            verify_account: true
        })

        if (!user) return errorHandler(res, 500, "failed")


        const kyc = new KycModel({ _id: user._id, user: user._id })

        await kyc.save()

        await responseResult({res, userId: user._id})
        

    } catch (error: any) {
        next(error)
    }

}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {
        email,
        password
    } = req.body


    try {

        const user = await User.findOne({ email });

        if (!user) return errorHandler(res, 500, " Not a register user.")


        const isEqual = await bcrypt.compare(password, user.password);


        if (!isEqual) return errorHandler(res, 500, "Invalid credential")

            await responseResult({res, userId: user._id})
       

    } catch (error: any) {
        next(error)
    }

}


export const changeUserPassword = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        newpassword:password
    } = req.body

   

    try {

        if (!req.payload) return errorHandler(res, 500, "user not login in")

        const user = await User.findById(req?.payload.userId)
        if (!user) return errorHandler(res, 500, "failed")

        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword

        user.save()
        await responseResult({res, userId: user._id})


    } catch (error: any) {
        next(error)
    }

}



