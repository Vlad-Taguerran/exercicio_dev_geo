import { User } from '../../../domain/entities/User';
import { UserPostDto } from '../../dtos/User/UserPostDto';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { UserGetDto } from '../../dtos/User/UserDto';
import { UserMappper } from '../../mappers/UserMapper';
import { UserAlreadyExistsError } from '../../erros/UserAlreadyExistsError';
export class CreateUser{
  constructor(private  userRepository:IUserRepository){}

  async execute(user: UserPostDto){
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const savedUser = await  this.userRepository.create(user);

    return savedUser;
  }
}