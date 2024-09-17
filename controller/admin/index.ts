import { NextFunction, Response } from "express";
import { IRequest } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import Donation from "../../model/donation";

export const getdonateItem = async (req: IRequest, res: Response, next: NextFunction) => {

    try {
       
        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const data = await Donation.find({}).sort("-updateAt");
        
        if(!data) return errorHandler(res, 500,"failed" )

            res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}
