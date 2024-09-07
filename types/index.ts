import { Request } from "express"

export interface IuserSchema {
    avatar: string,
      email?: string,
      password: string,
      fullname: string,
      phone_number: string,
      account_type:  "User" | 'Admin' ,
      verify_account: boolean

}


export interface IRequest extends Request {
  payload?: {
    email: string,
    userId: string,
    status: 'User' | "Admin",
  }
}