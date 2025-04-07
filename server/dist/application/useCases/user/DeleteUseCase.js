"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUseCase = void 0;
const NotFoundError_1 = require("../../erros/NotFoundError");
class DeleteUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const deleted = await this.userRepository.delete(id);
        ;
        if (!deleted) {
            throw new NotFoundError_1.NotFoundError("User not found");
        }
        ;
    }
}
exports.DeleteUseCase = DeleteUseCase;
