import { IHashService } from '../../../domain/interfaces/IHashService';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { generateToken } from '../../../infrastructure/config/jwtConfigure';
import { AuthDto } from '../../dtos/User/AuthDto';
import { ConflictError } from '../../erros/ConflictError';
import { NotFoundError } from '../../erros/NotFoundError';

export class LogginUseCase {
  constructor(private  userRepository:IUserRepository, private hashService : IHashService){}

  async execute(auth: AuthDto){
    const existingUser = await this.userRepository.findByEmail(auth.email);
    if(!existingUser){
      return new NotFoundError('User Not Found');
    }
    const validatePassword = await this.hashService.compare(auth.password,existingUser.password);
    if(!validatePassword){
      return new ConflictError("Password Not Correspondent")
    }
    return generateToken(existingUser)
  }
}