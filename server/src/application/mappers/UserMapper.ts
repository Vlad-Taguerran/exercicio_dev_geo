import { User } from "../../domain/entities/User";
import { UserModel } from "../../infrastructure/database/models/UserModel";
import { UserGetDto } from "../dtos/User/UserDto";
import { UserPostDto } from "../dtos/User/UserPostDto";

export class UserMappper{
  static toGetDto(user: User) : UserGetDto{
    return new UserGetDto(
      user.id,
      user.name,
      user.email
    );
  }
  static postToDomain(data:UserPostDto): User{
    return new User(
      '',
      data.name,
      data.email,
      data.password
    )
  }
  static toEntityFromDb(model:UserModel): User {
    return new User(model.id, model.name, model.email, model.password);
  }
}