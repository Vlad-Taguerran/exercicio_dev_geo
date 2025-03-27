import { UserPostDto } from '../dtos/User/UserPostDto';
import { CreateUser } from '../useCases/CreateUser';
import { UserRepository } from './../../infrastructure/database/repositories/UserRepository';
import { Request, Response } from 'express';

export class UserController {
    private userRepository: UserRepository;
    private createUser: CreateUser;

    constructor(){
      this.userRepository = new UserRepository();
      this.createUser = new CreateUser(this.userRepository);
    }
  async create(req: Request, res: Response){
    if(!req.body){
      throw new Error("Dados faltantes")
    }
    const { name, email, password } = req.body;

    const userDto = new UserPostDto(name, email, password)
    const user = await this.createUser.execute(userDto)
  }
}