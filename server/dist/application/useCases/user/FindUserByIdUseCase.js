"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserById = void 0;
const NotFoundError_1 = require("../../erros/NotFoundError");
class FindUserById {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("User not found");
        }
        ;
        return user;
    }
}
exports.FindUserById = FindUserById;
