import { UserPostDto } from '../dtos/User/UserPostDto';
import { CreateUser } from '../useCases/user/CreateUser';
import { Request, Response } from 'express';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UserController {
    private createUser: CreateUser;

    constructor(
      private userRepository: IUserRepository){
      this.createUser = new CreateUser(this.userRepository);
    }
  async create(req: Request, res: Response){
    if(!req.body){
     return res.status(400).json("Dados faltantes");
    }
   try {
    const { name, email, password } = req.body;

    const userDto = new UserPostDto(name, email, password)
    const user = await this.createUser.execute(userDto)
    return res.status(201).json(user);
   } catch (error) {
    console.log(`[ERROR] ${error}`);
    return res.status(500).json('Error no servidor')
   }
  }
}