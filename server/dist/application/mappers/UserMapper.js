"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMappper = void 0;
const User_1 = require("../../domain/entities/User");
const UserDto_1 = require("../dtos/User/UserDto");
class UserMappper {
    static toGetDto(user) {
        return new UserDto_1.UserGetDto(user.id, user.name, user.email);
    }
    static postToDomain(data) {
        return new User_1.User('', data.name, data.email, data.password);
    }
    static toEntityFromDb(model) {
        return new User_1.User(model.id, model.name, model.email, model.password);
    }
}
exports.UserMappper = UserMappper;
