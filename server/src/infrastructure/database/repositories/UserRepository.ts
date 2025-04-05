import { UserGetDto } from '../../../application/dtos/User/UserDto';
import { User } from '../../../domain/entities/User';
import { UserModel } from '../models/UserModel';
import { IUserRepository } from './../../../domain/repositories/IUserRepository';
export class UserRepository implements IUserRepository{
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) return null;
    return user;;
  }
  async findByEmail(email: string): Promise<UserGetDto | null> {
    try {
      console.log(email)
      const user = await UserModel.findOne({ where: { email } });
      console.log(user)
    if (!user) return null;
    return new UserGetDto(user.id, user.name, user.email);
    } catch (error) {
      console.log(error)
      throw new Error("Erro ao buscar usuario")
    }
  }
  async create(user: User): Promise<UserGetDto> {
   try {
    const createdUser = await UserModel.create({...user});
    return new UserGetDto(createdUser.id,createdUser.name,createdUser.email)
   } catch (error:any) {
   console.log(error.message, error);
    throw new Error(error.message);
   }
  }
  async delete(id: string): Promise<string | null> {
      const user = await UserModel.findOne({where:{id}})
      if(!user){
        return "Usuario não encontrado";
      }
      user.destroy();
      return "Usuario Deletado"
  }
  
}