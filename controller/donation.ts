import { Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import { IRequest } from "../types";
import Donation from "../model/donation";


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

        const data = await Donation.find({user: req?.payload.userId}).sort("-updateAt");
        
        if(!data) return errorHandler(res, 500,"failed" )

            res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}

export const getdonateItems = async (req: IRequest, res: Response, next: NextFunction) => {

    try {
       
        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const data = await Donation.find().sort("-updateAt");;
        
        if(!data) return errorHandler(res, 500,"failed" )

            res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}

export const singledonateUserItem = async (req: IRequest, res: Response, next: NextFunction) => {
    const {id} = req.params

    try {
       
        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const data = await Donation.findById(id).sort("-updateAt");
        
        if(!data) return errorHandler(res, 500,"failed" )

            res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}

export const donateItemReceived = async (req: IRequest, res: Response, next: NextFunction) => {
    const {id} = req.params

    try {
       
        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const data = await Donation.findById(id).sort("-updateAt");
              
        if(!data) return errorHandler(res, 500,"failed" )

            data.isRecieved = true
            data.save()

            res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}







