"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserByEmail = void 0;
const NotFoundError_1 = require("../../erros/NotFoundError");
class FindUserByEmail {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("User not found");
        }
        ;
        return user;
    }
}
exports.FindUserByEmail = FindUserByEmail;
