import { Response } from "express";


export const errorHandler = (res: Response, statusCode: number, message: string) => {

    // const error = new Error()

    // error.message = message;
    // // error.statusCode = statusCode
    
    // console.log("handler:", error)
    // throw error

    const status = statusCode || 500;
    
  return  res.status(status).json({ message })
}