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
exports.LogginUseCase = void 0;
const jwtConfigure_1 = require("../../../infrastructure/config/jwtConfigure");
class LogginUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(auth);
            const existingUser = yield this.userRepository.findByEmail(auth.email);
            if (!existingUser) {
                return null;
            }
            return (0, jwtConfigure_1.generateToken)(existingUser);
        });
    }
}
exports.LogginUseCase = LogginUseCase;
