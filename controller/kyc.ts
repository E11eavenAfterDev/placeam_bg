import KycModel from "../model/kyc"
import { Request, Response, NextFunction } from 'express';


export const submitKyc = async (req: Request, res: Response, next: NextFunction) => {
    const {
        email,
        firstname,
        lastname,
        document_back_view,
        document_front_view,
        document_type
    } = req.body
    const { userId } = req.params


    try {

        const response = await KycModel.findByIdAndUpdate(userId, {
            id_proof: {
                document_back_view,
                document_front_view,
                document_type
            },
            bio_data: {
                email,
                firstname,
                lastname
            },
            verify_kyc: true,
            kyc_submitted: true

        }, { new: true });


        if (response) return

        res.status(200).json({
            data: response
        })



    } catch (error) {
        next(error)
    }

}