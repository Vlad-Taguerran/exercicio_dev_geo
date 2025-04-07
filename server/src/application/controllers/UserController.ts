import { UserPostDto } from '../dtos/User/UserPostDto';
import { CreateUser } from '../useCases/user/CreateUser';
import { Request, Response } from 'express';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { FindUserByEmail } from '../useCases/user/FindUserByEmail';
import { UserMappper } from '../mappers/UserMapper';
import { handleHttpError } from '../erros/HttpErrorHandler';
import { FindUserById } from '../useCases/user/FindUserByIdUseCase';
import { UpdateUser } from '../useCases/user/UpdateUser';
import { UserUpdateDto } from '../dtos/User/UserUpdateDto';
import { IHashService } from '../../domain/interfaces/IHashService';

export class UserController {
  private createUser: CreateUser;
  private findUserByEmail: FindUserByEmail;
  private findUserById: FindUserById;
  private updateUser: UpdateUser;


  constructor(
    private userRepository: IUserRepository, private hashService : IHashService) {
      this.createUser = new CreateUser(this.userRepository);
      this.findUserByEmail = new FindUserByEmail(this.userRepository);
      this.findUserById = new FindUserById(this.userRepository);
      this.updateUser = new UpdateUser(this.userRepository, hashService);
  }
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const userDto = new UserPostDto(name, email, password);
      const user = await this.createUser.execute(userDto);
      return res.status(201).json(UserMappper.toGetDto(user));
    } catch (error) {
      return handleHttpError(error, res);
    }
  }

  async findByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await this.findUserByEmail.execute(email);
      return res.status(200).json(UserMappper.toGetDto(user));
    } catch (error) {
      return handleHttpError(error, res);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.findUserById.execute(id);
      return res.status(200).json(UserMappper.toGetDto(user));
    } catch (error) {
      return handleHttpError(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const dto = new UserUpdateDto(id, name, email, password);
      const user = await this.updateUser.execute(dto);
      return res.status(200).json(UserMappper.toGetDto(user!));
    } catch (error) {
      return handleHttpError(error, res);
    }
  }
}