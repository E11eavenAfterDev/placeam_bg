import KycModel from "../model/kyc"
import User from "../model/user"
import { Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import { IRequest } from "../types";
import { responseResult } from "../utils/response";
import Donation from "../model/donation";


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

export const updataUserAvatar = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        avatar
    } = req.body

    try {
       
        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const user = await User.findById(req?.payload.userId)

        if(!user) return errorHandler(res, 500,"failed" )

        user.email = avatar
       
        user.save()

        await responseResult({res, userId: user._id})

    } catch (error:any) {
        next(error)
    }

}


export const donateItem = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        category,
        latitude,
            longtitude,
            pickup_date,
            pickup_location
    } = req.body

    try {
       
        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const donation = await Donation.create({
            user: req?.payload.userId,
            category,
            latitude,
            longtitude,
            pickup_date,
            pickup_location
        })

        if(!donation) return errorHandler(res, 500,"failed" )

            res.status(200).json({message: "Successful"})

    } catch (error:any) {
        next(error)
    }

}


export const getdonateUserItem = async (req: IRequest, res: Response, next: NextFunction) => {

    try {
       
        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const data = await Donation.find({user: req?.payload.userId}).sort("-updateAt");;
        
        if(!data) return errorHandler(res, 500,"failed" )

            res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}


