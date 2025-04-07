"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const UserAlreadyExistsError_1 = require("../../erros/UserAlreadyExistsError");
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(user) {
        const existingUser = await this.userRepository.findByEmail(user.email);
        if (existingUser) {
            throw new UserAlreadyExistsError_1.UserAlreadyExistsError();
        }
        const savedUser = await this.userRepository.create(user);
        return savedUser;
    }
}
exports.CreateUser = CreateUser;
