"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthDto_1 = require("../dtos/User/AuthDto");
const loginUseCase_1 = require("../useCases/auth/loginUseCase");
const UserRepository_1 = require("../../infrastructure/database/repositories/UserRepository");
class AuthController {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
        this.logginUseCase = new loginUseCase_1.LogginUseCase(this.userRepository);
    }
    loging(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body) {
                    return res.status(400).json('Formulario vazio');
                }
                const { password, email } = req.body;
                const response = yield this.logginUseCase.execute(new AuthDto_1.AuthDto(email, password));
                if (!response) {
                    return res.status(404).json('Usuario não encontrado');
                }
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(500).json('Erro no servidor');
            }
        });
    }
}
exports.AuthController = AuthController;
