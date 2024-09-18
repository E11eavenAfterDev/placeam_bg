import KycModel from "../model/kyc"
import { Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import { IRequest } from "../types";
import { getDataUri } from "../utils/features";
import { v2 as cloudinary } from 'cloudinary';

export const updateKyc = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        email,
        firstname,
        lastname,
        address,
        document_type,
        bank_name,
        account_number,
        account_name
    } = req.body


if(!req.files) {
     return errorHandler(res, 500,"kyc information incomplete")
}
if(req.files?.length == 0) {
     return errorHandler(res, 500,"kyc information incomplete")
}

 const items:{
 [key: string]: any,
 } = req.files;


    try {

        if(!req.payload) return errorHandler(res, 500,"user not login in" )


            let document_back_view;
            let document_front_view;


            for (const image in items.document_front_view){

                const file =  getDataUri(items.document_front_view[image])
              const result = await cloudinary.uploader.upload(file.content!, {folder: "placeAmUserProfilePhotos", public_id: `${email}_front`, overwrite: true, filename_override: `${email}_front`});
              
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
              
              document_front_view = url
            }
        
            for (const image in items.document_back_view){
        
                const file =  getDataUri(items.document_back_view[image])
              const result = await cloudinary.uploader.upload(file.content!, {folder: "placeAmUserProfilePhotos", public_id:`${email}_back`, overwrite: true, filename_override: `${email}_back`});
             
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
             
              document_back_view = url
            }
        

        const response = await KycModel.findByIdAndUpdate(req.payload.userId, {
            id_proof: {
                document_back_view,
                document_front_view,
                document_type
            },
            bio_data: {
                email,
                firstname,
                lastname,
                address
            },
            payment_data:{
                bank_name,
                account_number,
                account_name
            },
            verify_kyc: true,
            kyc_submitted: true

        }, { new: true });


        if (!response) return errorHandler(res, 500,"failed" )

        res.status(200).json({
            data: {
                kyc_submitted: response.kyc_submitted
            }
        })



    } catch (error) {
        next(error)
    }

}



export const getKyc = async (req: IRequest, res: Response, next: NextFunction) => {

    try {

        if(!req.payload) return errorHandler(res, 500,"user not login in" )

        const response = await KycModel.findById(req.payload.userId)

        res.status(200).json({
            data: response
        })


    } catch (error) {
        const newError = new Error("Server Error")
        next(newError)
    }

}



