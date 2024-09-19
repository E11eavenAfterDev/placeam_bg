
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import { IRequest } from "../types";
import Category from "../model/productcategory";
import Banner from "../model/banner";
import { SellingProduct } from "../model";
import { getDataUri } from '../utils/features';
import { v2 as cloudinary } from 'cloudinary';


export const getCategory = async (req: IRequest, res: Response, next: NextFunction) => {
  
    try {
        
         const data = await Category.find()
         res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}

export const createCategory = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        avatar,
        backgroup_color,
        name
    } = req.body

    try {

        await Category.create({
            avatar,
            backgroup_color,
            name
         })

         res.status(200).json({message: "success"})
       

    } catch (error:any) {
        next(error)
    }

}

export const deleteCategory = async (req: IRequest, res: Response, next: NextFunction) => {

    try {
        await Category.findByIdAndDelete(req.params.id)

         res.status(200).json({message: "success"})
       

    } catch (error:any) {
        next(error)
    }

}


// bannner
export const createBanner = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        avatar,
    } = req.body

    try {

        await Banner.create({
            avatar
         })

         res.status(200).json({message: "success"})
       

    } catch (error:any) {
        next(error)
    }

}

export const deleteBanner = async (req: IRequest, res: Response, next: NextFunction) => {

    try {
        await Banner.findByIdAndDelete(req.params.id)

         res.status(200).json({message: "success"})
       

    } catch (error:any) {
        next(error)
    }

}

export const getBanner = async (req: IRequest, res: Response, next: NextFunction) => {
  
    try {
        
         const data = await Banner.find()
         res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}

// product
export const createProduct = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        isNegotiable,
        category,
        name,
        size,
        description,
        price
    } = req.body;

    const files:any = req.files
    const productimages = files.images


    try {

        // if(isNegotiable == undefined || !category || !name || !size || !description || !price) return errorHandler(res, 401, "All fields is required")

       
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
       
       
       
       
       
       
       
        const response = await SellingProduct.create({
        product: {
            user:  req.payload?.userId,
              isNegotiable,
              category,
             product_detail: {
                name,
                size,
                description,
                price,
                images
             },
        }

         })

         res.status(200).json({message: "success", response})
       

    } catch (error:any) {
        next(error)
    }

}


export const deleteProduct = async (req: IRequest, res: Response, next: NextFunction) => {

    try {
        await SellingProduct.findByIdAndDelete(req.params.prodId)

         res.status(200).json({message: "success"})
       

    } catch (error:any) {
        next(error)
    }

}

export const getProducts = async (req: IRequest, res: Response, next: NextFunction) => {
  
    try {
        
         const data = await SellingProduct.find()
         res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}


export const getProduct = async (req: IRequest, res: Response, next: NextFunction) => {
  
    try {
        
         const data = await SellingProduct.findById(req.params.prodId)
         res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}


