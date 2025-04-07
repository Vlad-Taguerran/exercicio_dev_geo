"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogginUseCase = void 0;
const jwtConfigure_1 = require("../../../infrastructure/config/jwtConfigure");
const ConflictError_1 = require("../../erros/ConflictError");
const NotFoundError_1 = require("../../erros/NotFoundError");
class LogginUseCase {
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }
    async execute(auth) {
        const existingUser = await this.userRepository.findByEmail(auth.email);
        if (!existingUser) {
            return new NotFoundError_1.NotFoundError('User Not Found');
        }
        const validatePassword = await this.hashService.compare(auth.password, existingUser.password);
        if (!validatePassword) {
            return new ConflictError_1.ConflictError("Password Not Correspondent");
        }
        return (0, jwtConfigure_1.generateToken)(existingUser);
    }
}
exports.LogginUseCase = LogginUseCase;
