import { AuthDto } from '../dtos/User/AuthDto';
import { LogginUseCase } from '../useCases/auth/loginUseCase';
import { UserRepository } from '../../infrastructure/database/repositories/UserRepository';
import { Request, Response } from 'express'
import { IUserRepository } from '../../domain/repositories/IUserRepository';
export class AuthController {
  private logginUseCase: LogginUseCase

  constructor(private userRepository: IUserRepository,
  ) {
    this.logginUseCase = new LogginUseCase(this.userRepository);
  }
  async loging(req: Request, res: Response) {
    try {
      if (!req.body) {
        return res.status(400).json('Formulario vazio');
      }
      const { password, email } = req.body;
      const response = await this.logginUseCase.execute(new AuthDto(email, password))
      if (!response) {
        return res.status(404).json('Usuario não encontrado');
      }
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json('Erro no servidor')
    }
  }
}