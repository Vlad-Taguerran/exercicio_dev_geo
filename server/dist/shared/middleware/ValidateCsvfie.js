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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCsvFile = void 0;
const fs_1 = __importDefault(require("fs"));
// Middleware para validar se o arquivo CSV existe e se o caminho é válido
const validateCsvFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { filePath } = req.body;
    if (!filePath) {
        return res.status(400).json({ error: 'O caminho do arquivo é obrigatório.' });
    }
    try {
        // Verificar se o arquivo existe no sistema
        const fileExists = fs_1.default.existsSync(filePath);
        if (!fileExists) {
            return res.status(404).json({ error: 'Arquivo CSV não encontrado no caminho fornecido.' });
        }
        // Chama o próximo middleware ou controlador
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.validateCsvFile = validateCsvFile;
