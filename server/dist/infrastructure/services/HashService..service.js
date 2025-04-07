"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashService = void 0;
const bcrypt_1 = __importDefault(require("bcryptjs"));
class HashService {
    async hash(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
    async compare(plain, hashed) {
        return await bcrypt_1.default.compare(plain, hashed);
    }
}
exports.HashService = HashService;
