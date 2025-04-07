import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { logError } from "../../../infrastructure/config/logHelpers";
import { NotFoundError } from "../../erros/NotFoundError";

export class FindUserById{
  constructor(private userRepository:IUserRepository){}

  async execute(id: string){
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new NotFoundError("User not found");
      };
  
      return user;
  }
}