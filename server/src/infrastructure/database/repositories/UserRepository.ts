import { UserPostDto } from '../../../application/dtos/User/UserPostDto';
import { UserMappper } from '../../../application/mappers/UserMapper';
import { User } from '../../../domain/entities/User';
import { UserModel } from '../models/UserModel';
import { IUserRepository } from './../../../domain/repositories/IUserRepository';
export class UserRepository implements IUserRepository{
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) return null;
    return user;;
  }
  async findByEmail(email: string): Promise<User | null> {
    try {
      const model = await UserModel.findOne({ where: { email } });
    if (!model) return null;
      
    return UserMappper.toEntityFromDb(model);
    } catch (error) {
      throw new Error("Erro ao buscar usuario")
    }
  }
  async create(dto: UserPostDto): Promise<User> {
    const user = UserMappper.postToDomain(dto);
   try {
    const model = await UserModel.create({...user});
    
    return UserMappper.toEntityFromDb(model);
   } catch (error:any) {
    throw new Error(error.message);
   }
  }
  async update(user: User): Promise<User | null>{
    const model = await UserModel.findByPk(user.id);
    if(!model) return null;
    model.name = user.name;
    model.email = user.name;
    const updatedUser = await model.save();
   return UserMappper.toEntityFromDb(updatedUser)
  }
  async delete(id: string): Promise<boolean> {
     const deleted = await UserModel.destroy({where:{id:id}});

     return deleted > 0;
  }
  
}