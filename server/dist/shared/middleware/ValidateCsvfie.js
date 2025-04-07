"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCsvFile = void 0;
const fs_1 = __importDefault(require("fs"));
// Middleware para validar se o arquivo CSV existe e se o caminho é válido
const validateCsvFile = async (req, res, next) => {
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
};
exports.validateCsvFile = validateCsvFile;
