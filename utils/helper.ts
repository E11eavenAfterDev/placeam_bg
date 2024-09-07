import { NextFunction, Response } from "express"
import { IRequest } from "../types"
import { errorHandler } from "./errorHandler"
import User from "../model/user"


export const onlyLoginUser = async (req: IRequest, res: Response, next: NextFunction) => {

    if (!req.payload) return errorHandler(res, 500, "not a login in user")

    const isRegisterUser = await User.findById(req?.payload.userId)

    if (!isRegisterUser) return errorHandler(res, 500, "invalid credential")

    next()
}



