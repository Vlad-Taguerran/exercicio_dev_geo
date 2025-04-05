import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { logError } from "../../../infrastructure/config/logHelpers";
import { NotFoundError } from "../../erros/NotFoundError";

export class UpdateUser{
  constructor(private userRepository:IUserRepository){}

  async execute(userData: User){
      const user = await this.userRepository.findById(userData.id);
      if (!user) {
        throw new NotFoundError("User not found");
      };
       const updatedUser = await this.userRepository.update(userData);
  
      return updatedUser;
  }
}