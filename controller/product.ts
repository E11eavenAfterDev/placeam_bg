import KycModel from "../model/kyc"
import User from "../model/user"
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs"
import authToken from "../utils/token";
import { IRequest } from "../types";
import { responseResult } from "../utils/response";
import Category from "../model/productcategory";
import Banner from "../model/banner";
import Product from "../model/product";


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
        avatar,
    } = req.body

    try {

        await Product.create({
            
         })

         res.status(200).json({message: "success"})
       

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
        
         const data = await Product.find()
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


