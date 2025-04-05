import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { generateToken } from '../../../infrastructure/config/jwtConfigure';
import { AuthDto } from '../../dtos/User/AuthDto';

export class LogginUseCase {
  constructor(private  userRepository:IUserRepository){}

  async execute(auth: AuthDto){
    console.log(auth)
    const existingUser = await this.userRepository.findByEmail(auth.email);
    if(!existingUser){
      return null;
    }
    return generateToken(existingUser)
  }
}