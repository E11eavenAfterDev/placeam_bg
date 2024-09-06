import { IuserSchema } from "../types";
import 'dotenv/config'

import jwt from "jsonwebtoken";


class authToken {
  createToken = async function ({email,userId, status}:{email: string,userId: string, status: string}) {
    const maxAge = 1000 * 60 * 60 * 24 * 7;
    let expiredAt = new Date().getSeconds() + maxAge;

    let token = jwt.sign(
      { email, userId , status},
      process.env.JWT_SIGN!,
      { expiresIn: expiredAt }
    );

    return { token, expiredAt };
  };

  verifyExpiration = (token: string) => {

    const decodedToken = jwt.verify(token, process.env.JWT_SIGN!);

    // return decodedToken < new Date().getSeconds();
  };
  //   return authToken;
}

export default new authToken();
