"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthDto_1 = require("../dtos/User/AuthDto");
const loginUseCase_1 = require("../useCases/auth/loginUseCase");
class AuthController {
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.logginUseCase = new loginUseCase_1.LogginUseCase(this.userRepository, this.hashService);
    }
    async loging(req, res) {
        try {
            if (!req.body) {
                return res.status(400).json('Formulario vazio');
            }
            const { password, email } = req.body;
            const response = await this.logginUseCase.execute(new AuthDto_1.AuthDto(email, password));
            if (!response) {
                return res.status(404).json('Usuario não encontrado');
            }
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json('Erro no servidor');
        }
    }
}
exports.AuthController = AuthController;
