
import { Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import { IRequest } from "../types";
import Category from "../model/productcategory";
import Banner from "../model/banner";
import { getDataUri } from '../utils/features';
import { v2 as cloudinary } from 'cloudinary';
import { Bid, Notification, Product} from '../model';


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
           productType: "dashbroad"
         })

         res.status(200).json({message: "success", response})
       

    } catch (error:any) {
        next(error)
    }

}


export const deleteProduct = async (req: IRequest, res: Response, next: NextFunction) => {

    try {
        await Product.findByIdAndDelete(req.params.prodId)

         res.status(200).json({message: "success"})
       

    } catch (error:any) {
        next(error)
    }

}

export const getProducts = async (req: IRequest, res: Response, next: NextFunction) => {
  
    try {
        
         const data = await Product.find({productType: "dashbroad", status: "Available"}).populate("user", "avatar fullname")
         res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}


export const getProduct = async (req: IRequest, res: Response, next: NextFunction) => {
  
    try {
        
         const data = await Product.findById(req.params.prodId)
         res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}


// bid
export const createBid = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        amount,
        prodId,
    } = req.body;

    try {

       const product = await Product.findById(prodId).populate("user");

     if(!product) return errorHandler(res, 500,"Item not found" );
     let item: any = product.user;


        await Bid.create({
            amount,
            bidder: req.payload?.userId,
            user: product.user,
            product: prodId,
            bidBy: item.fullname,
            message: `has offered to pay ₦${amount} instead of ₦${product.product_detail.price} for the ${product.product_detail.name} you uploaded for sale`
        })

   

       await Notification.create({
            user: product?.user,
            message: `${item.fullname} has offered to pay ₦${amount} instead of ₦${product.product_detail.price} for the ${product.product_detail.name} you uploaded for sale`
        })
       

         res.status(200).json({message: "success", })
       

    } catch (error:any) {
        next(error)
    }

}


export const ApprovedBid = async (req: IRequest, res: Response, next: NextFunction) => {
    req.body.bidStatus = "Approved"
    next()
}
export const RejectBid = async (req: IRequest, res: Response, next: NextFunction) => {
    req.body.bidStatus = "Rejected"
    next()
}


export const changeBidStatus = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        bidId,
    } = req.body;

    try {


    const bid =  await Bid.findById(bidId).populate("bidder")
     if(!bid) return errorHandler(res, 500,"Invalid bid" );
     const product = await Product.findById(bid.product).populate("user");

     if(!product) return errorHandler(res, 500,"Item not found" );


if(req.body.bidStatus == "Approved") {
    

    product.product_detail.price = bid.amount

    product.save()
    // bid.bidStatus = "Approved"
    // bid.save()

      await Notification.create({
            user: bid?.bidder,
            message: `${product.product_detail.name} you bid for as been approved continue to checkout as the price is change for all users`
        })

}


if( req.body.bidStatus == "Rejected") {

    // bid.bidStatus = "Rejected"
    // bid.save()
    await Notification.create({
        user: bid?.bidder,
        message: `Sorry ₦${bid.amount} was not accepted for ${product.product_detail.name}.`
    })
}

         await Bid.findByIdAndDelete(bidId)

         res.status(200).json({message: "success", })
       

    } catch (error:any) {
        next(error)
    }

}
