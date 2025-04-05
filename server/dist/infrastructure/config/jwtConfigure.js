"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || '2d3d8b43fa0cb7929eeacc30f52d7e5b4b3f52adb923497e4549f7b5cb26292b';
const generateToken = (user) => {
    const payload = {
        userId: user.id,
        userEmail: user.email
    };
    const options = {
        expiresIn: '6h'
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
