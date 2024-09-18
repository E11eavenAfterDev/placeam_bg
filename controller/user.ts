import { v2 as cloudinary } from 'cloudinary';
import User from "../model/user"
import { Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import { IRequest } from "../types";
import { responseResult } from "../utils/response";
import Donation from "../model/donation";
import { getDataUri } from "../utils/features";


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





