import { User } from '../../domain/entities/User';
import { UserPostDto } from '../dtos/User/UserPostDto';
import { IUserRepository } from './../../domain/repositories/IUserRepository';
export class CreateUser{
  constructor(private  userRepository:IUserRepository){}

  async execute(data: UserPostDto){
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists!");
    }

    const user = new User('',data.name, data.email, data.password);
    return this.userRepository.create(user);
  }
}