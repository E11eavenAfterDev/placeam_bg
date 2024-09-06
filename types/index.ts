export interface IuserSchema {
    avatar: string,
      email?: string,
      password: string,
      fullname: string,
      phone_number: string,
      account_type:  "User" | 'Admin' ,
      verify_account: boolean

}