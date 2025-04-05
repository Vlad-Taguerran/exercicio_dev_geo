import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { logError } from "../../../infrastructure/config/logHelpers";
import { NotFoundError } from "../../erros/NotFoundError";

export class FindUserByEmail{
  constructor(private userRepository:IUserRepository){}

  async execute(email: string){
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundError("User not found");
      };
  
      return user;
  }
}