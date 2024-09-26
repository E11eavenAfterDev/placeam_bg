import { NextFunction, Response } from "express";
import { IRequest } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import Donation from "../../model/donation";
import { Notification, Pickup, Product } from "../../model";
import { v2 as cloudinary } from 'cloudinary';

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



export const getAllPendingRentalProducts = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
         const data = await Pickup.find().populate("product")

         res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }
}




export const setRental = async (req: IRequest, res: Response, next: NextFunction) => {

    const type = req.query.type
    const {pickupId} = req.body

    try {
         const data = await Pickup.findById(pickupId).populate("product");
         if(!data) return errorHandler(res, 500,"invalid pick up");

         const product = await Product.findById(data.product);

         if(!product) return errorHandler(res,400,"invalid product");

         if(type == "approved"){
            product.status = "Available"
            product.save()

            await Notification.create({
                user: product?.user,
                message: `${product.product_detail.name} as been approved and added to placeam in-store.`
            })

            await Pickup.findByIdAndDelete(pickupId)
         }

         if(type == "rejected"){

         let queryproduct:any = data.product;           
           const query = [...queryproduct.product_detail.images];

           query.forEach(async(item) => {
            console.log(item.public)
            await cloudinary.uploader.destroy(item.public)
           })

           await Notification.create({
            user: product.user,
            message: `${product.product_detail.name} was rejected by placeam.`
        })
           await Product.findByIdAndDelete(data.product)
         await Pickup.findByIdAndDelete(pickupId)

         }

         res.status(200).json({message: "success"})

    } catch (error:any) {
        next(error)
    }
}

