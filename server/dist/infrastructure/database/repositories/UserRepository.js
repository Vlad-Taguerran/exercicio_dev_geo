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
exports.UserRepository = void 0;
const UserDto_1 = require("../../../application/dtos/User/UserDto");
const UserModel_1 = require("../models/UserModel");
class UserRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findOne({ where: { id } });
            if (!user)
                return null;
            return user;
            ;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(email);
                const user = yield UserModel_1.UserModel.findOne({ where: { email } });
                console.log(user);
                if (!user)
                    return null;
                return new UserDto_1.UserGetDto(user.id, user.name, user.email);
            }
            catch (error) {
                console.log(error);
                throw new Error("Erro ao buscar usuario");
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdUser = yield UserModel_1.UserModel.create(Object.assign({}, user));
                return new UserDto_1.UserGetDto(createdUser.id, createdUser.name, createdUser.email);
            }
            catch (error) {
                console.log(error.message, error);
                throw new Error(error.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.UserModel.findOne({ where: { id } });
            if (!user) {
                return "Usuario não encontrado";
            }
            user.destroy();
            return "Usuario Deletado";
        });
    }
}
exports.UserRepository = UserRepository;
