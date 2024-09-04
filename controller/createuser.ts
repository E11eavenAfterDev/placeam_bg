import KycModel from "../model/kyc"
import User from "../model/user"
import { Request, Response, NextFunction } from 'express';


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {
        email,
        fullname,
        password,
        phone_number,
       
    } = req.body
   

    try {


        const user = await User.create({
            account_type: "User",
            email,
            fullname,
            password,
            phone_number,
            verify_account: true
        })

       await KycModel.create({
            _id: user._id
        }, { new: true });


   

        res.status(200).json({
            data: user
        })



    } catch (error) {
        next(error)
    }

}