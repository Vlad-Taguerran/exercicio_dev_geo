"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || '2d3d8b43fa0cb7929eeacc30f52d7e5b4b3f52adb923497e4549f7b5cb26292b';
// Middleware de autenticação
const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    console.log(token);
    if (token == null) {
        res.sendStatus(401);
        return;
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            res.sendStatus(403);
            return;
        }
        // Se a verificação for bem-sucedida, adicione as informações do usuário ao objeto de requisição
        req.user = user;
        next(); // Passa para o próximo middleware ou rota
    });
};
exports.authenticateMiddleware = authenticateMiddleware;
