import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { NotFoundError } from "../../erros/NotFoundError";

export class DeleteUseCase{
  constructor(private userRepository:IUserRepository){}

  async execute(id: string):Promise<void>{
    const deleted = await this.userRepository.delete(id);;
      if (!deleted) {
        throw new NotFoundError("User not found");
      };

  }
}