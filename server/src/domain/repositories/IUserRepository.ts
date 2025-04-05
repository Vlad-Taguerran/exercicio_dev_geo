import { UserGetDto } from "../../application/dtos/User/UserDto";
import { UserPostDto } from "../../application/dtos/User/UserPostDto";
import { User } from "../entities/User";

export interface IUserRepository {
  create(user: UserPostDto): Promise<User>;
  update(user: User): Promise<User | null>
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  
}