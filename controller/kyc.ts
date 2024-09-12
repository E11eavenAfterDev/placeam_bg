import KycModel from "../model/kyc"
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import { IRequest } from "../types";


export const updateKyc = async (req: IRequest, res: Response, next: NextFunction) => {
    const {
        email,
        firstname,
        lastname,
        address,
        document_back_view,
        document_front_view,
        document_type,
        bank_name,
        account_number,
        account_name
    } = req.body
  

    try {

        if(!req.payload) return errorHandler(res, 500,"user not login in" )

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



