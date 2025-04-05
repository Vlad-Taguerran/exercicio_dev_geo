import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { ILoginUser } from '../interfaces/ILoginUser';



const secretKey = process.env.JWT_SECRET || '2d3d8b43fa0cb7929eeacc30f52d7e5b4b3f52adb923497e4549f7b5cb26292b'

export const generateToken = (user: ILoginUser) =>{
  const payload ={
    userId: user.id,
    userEmail: user.email
  };

  const options:SignOptions ={
    expiresIn: '6h'
  };
 
  return jwt.sign(payload,secretKey,options)
}

