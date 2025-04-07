import { User } from "../../../domain/entities/User";
import { IHashService } from "../../../domain/interfaces/IHashService";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { logError } from "../../../infrastructure/config/logHelpers";
import { UserUpdateDto } from "../../dtos/User/UserUpdateDto";
import { NotFoundError } from "../../erros/NotFoundError";

export class UpdateUser{
  constructor(private userRepository:IUserRepository, private hashService: IHashService){}

  async execute(updateDto: UserUpdateDto){
      const user = await this.userRepository.findById(updateDto.id);
      if (!user) {
        throw new NotFoundError("User not found");
      };
      const updateData: Partial<{ name: string; email: string; password: string }> = {
        name: updateDto.name,
        email: updateDto.email,
      };
      
      if (updateDto.password) {
        updateData.password = await this.hashService.hash(updateDto.password);
      }
      
      
      user.updateProfile(updateData);
     const updatedUser = await this.userRepository.update(user);

     return updatedUser;

  }
}