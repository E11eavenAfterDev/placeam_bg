
import { Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import { IRequest } from "../types";
import Category from "../model/productcategory";
import Banner from "../model/banner";
import { getDataUri } from '../utils/features';
import { v2 as cloudinary } from 'cloudinary';
import { Product , Pickup} from '../model';



// product
export const createRental = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        isNegotiable,
        category,
        name,
        size,
        description,
        price,
        rentalPeriod,
        latitude,
        longtitude,
        pickup_date,
        pickup_location
    } = req.body;

    const files:any = req.files
    const productimages = files.images


    try {
       
        let images = [];
        for (const image in productimages){

            const file =  getDataUri(productimages[image])
          const result = await cloudinary.uploader.upload(file.content!, {folder: "placeAmUserProductPhotos", overwrite: true});
          
          const url =  cloudinary.url(result.public_id, {
            transformation: [
                {
                    quality: "auto",
                    fetch_format: "auto",
                },
                {
                    width: 500,
                    height: 500,
                    crop: "fill",
                    gravity: "auto"
                }
            ]
          })
          
          images.push({
            url,
            public: result.public_id
          })
        }

            if(images.length === 0){
                return errorHandler(res, 400, "product photo is required")
            }
       
       
        const response = await Product.create({
            user:  req.payload?.userId,
              category,
              isNegotiable,
             product_detail: {
                name,
                size,
                description,
                price,
                images
             },
           productType: "rental",
           rentalPeriod,
           status: "unAvailable"
         })


         await Pickup.create({
            user: req.payload?.userId,
            product: response._id,
            pickup_detail: {
                pickup_date,
                pickup_location,
                latitude,
                longtitude
            }
         })




         res.status(200).json({message: "success", response})
       

    } catch (error:any) {
        next(error)
    }

}

export const getRentalProducts = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
         const data = await Product.find({productType: "rental", status: "Available"})
         res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }
}
