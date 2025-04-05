import { User } from '../../../domain/entities/User';
import { UserPostDto } from '../../dtos/User/UserPostDto';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { UserGetDto } from '../../dtos/User/UserDto';
export class CreateUser{
  constructor(private  userRepository:IUserRepository){}

  async execute(data: UserPostDto){
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists!");
    }

    const user = new User('',data.name, data.email, data.password);
    const savedUser =await  this.userRepository.create(user);

    return new UserGetDto(savedUser.id,savedUser.name,savedUser.email);
  }
}