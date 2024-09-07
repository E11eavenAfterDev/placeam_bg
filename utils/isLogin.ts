import { NextFunction, Response } from "express"
import { IRequest } from "../types"
import { errorHandler } from "./errorHandler"

export const onlyLoginUser = async (req: IRequest, res: Response, next: NextFunction) => {

    if(!req.payload) return errorHandler(res, 500,"not a login in user" )
        next()
  
}
