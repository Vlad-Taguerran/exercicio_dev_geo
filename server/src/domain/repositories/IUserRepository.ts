import { UserGetDto } from "../../application/dtos/User/UserDto";
import { User } from "../entities/User";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<UserGetDto | null>;
  create(user: User): Promise<UserGetDto>;
  delete(id: string): Promise<string | null>;
}