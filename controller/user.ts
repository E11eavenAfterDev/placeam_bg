import { v2 as cloudinary } from 'cloudinary';
import User from "../model/user"
import { Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import { IRequest } from "../types";
import { responseResult } from "../utils/response";
import { getDataUri } from "../utils/features";
import { Product , Notification, Bid} from '../model';


export const updateUser = async (req: IRequest, res: Response, next: NextFunction) => {
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

export const updateUserAvatar = async (req: IRequest, res: Response, next: NextFunction) => {
   
    try {
       
        if(!req.payload) return errorHandler(res, 500,"user not login in" );
        if(!req.file) return errorHandler(res, 500,"file is required" );
        const user = await User.findById(req?.payload.userId)
        if(!user) return errorHandler(res, 500,"invalid user")

         const file =  getDataUri(req.file)


      const isAvatar = await cloudinary.api.resource(user.public_id).then(result=>{
        return result

       }).catch(() => {
       return null
       })


     

   if(isAvatar) {
    await cloudinary.uploader.destroy(user.public_id)
       }
       
       if(!file.content) return errorHandler(res, 500,"file is required" );

  const upload =  await cloudinary.uploader.upload(file.content, {folder: "placeAmUserProfilePhotos"});

  const url =  cloudinary.url(upload.public_id, {
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

        user.avatar = url
        user.public_id = upload.public_id
       
        user.save()

        await responseResult({res, userId: user._id})


    } catch (error:any) {
        next(error)
    }

}




export const userNotifications = async (req: IRequest, res: Response, next: NextFunction) => {
   
    try {
      if(!req.payload) return errorHandler(res, 500,"user not login in" );
      const data = await Notification.find({user: req?.payload.userId}).sort("-createdAt")
  
      res.status(200).json({data})
  
      } catch (error:any) {
          next(error)
      }
  
  }
  
export const userBid = async (req: IRequest, res: Response, next: NextFunction) => {
   
    try {
      if(!req.payload) return errorHandler(res, 500,"user not login in" );
      const data = await Bid.find({user: req?.payload.userId}).sort("-createdAt")
  
      res.status(200).json({data})
  
      } catch (error:any) {
          next(error)
      }
  
  }



export const userProductSold = async (req: IRequest, res: Response, next: NextFunction) => {
   
  try {
    if(!req.payload) return errorHandler(res, 500,"user not login in" );
    const data = await Product.find({user: req?.payload.userId, status: "Sold"}).populate("user", "avatar fullname").sort("-createdAt")

    res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }

}



export const userProductStock = async (req: IRequest, res: Response, next: NextFunction) => {
   
  try {
    if(!req.payload) return errorHandler(res, 500,"user not login in" );
    const data = await Product.find({user: req?.payload.userId, status: "Available"}).populate("user", "avatar fullname").sort("-createdAt")

    res.status(200).json({data})

    } catch (error:any) {
        next(error)
    }
}

