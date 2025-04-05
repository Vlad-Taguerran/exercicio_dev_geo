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
exports.UserController = void 0;
const UserPostDto_1 = require("../dtos/User/UserPostDto");
const CreateUser_1 = require("../useCases/user/CreateUser");
const UserRepository_1 = require("../../infrastructure/database/repositories/UserRepository");
class UserController {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
        this.createUser = new CreateUser_1.CreateUser(this.userRepository);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body) {
                return res.status(400).json("Dados faltantes");
            }
            try {
                const { name, email, password } = req.body;
                const userDto = new UserPostDto_1.UserPostDto(name, email, password);
                const user = yield this.createUser.execute(userDto);
                return res.status(201).json(user);
            }
            catch (error) {
                console.log(`[ERROR] ${error}`);
                return res.status(500).json('Error no servidor');
            }
        });
    }
}
exports.UserController = UserController;
