import { UserPostDto } from '../dtos/User/UserPostDto';
import { CreateUser } from '../useCases/user/CreateUser';
import { Request, Response } from 'express';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { FindUserByEmail } from '../useCases/user/FindUserByEmail';
import { logError } from '../../infrastructure/config/logHelpers';
import { UserMappper } from '../mappers/UserMapper';
import { AppError } from '../erros/AppError';

export class UserController {
  private createUser: CreateUser;
  private findUserByEmail: FindUserByEmail

  constructor(
    private userRepository: IUserRepository) {
    this.findUserByEmail = new FindUserByEmail(userRepository);
    this.createUser = new CreateUser(this.userRepository);
  }
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const userDto = new UserPostDto(name, email, password)
      const user = await this.createUser.execute(userDto)

      return res.status(201).json(UserMappper.toGetDto(user));

    } catch (error) {
    if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    logError("Erro on create",error);
    res.status(500).json({ message: "Internal server error" });
  }
    }
  };

  
  async findByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body
      const user = await this.findUserByEmail.execute(email);
      const dto = UserMappper.toGetDto(user);
      return res.status(200).json(dto);


    } catch (err:any) {
    if (err.name === "NotFoundError") {
    return res.status(404).json({ message: err.message });
  }

  logError("Error on findBy Email",err);
  return res.status(500).json({ message: "Internal server error" });
    }
  }
}