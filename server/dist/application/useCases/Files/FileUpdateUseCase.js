"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpdate = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const File_1 = require("../../../domain/entities/File");
class FileUpdate {
    constructor(fileRepository, validator) {
        this.fileRepository = fileRepository;
        this.validator = validator;
    }
    async execute(filename, path) {
        const isValid = await this.validator.validate(path);
        if (!isValid) {
            await promises_1.default.unlink(path);
            throw new Error("CSV inválido. Verifique os títulos das colunas.");
        }
        const file = new File_1.File(filename, path);
        await this.fileRepository.save(file);
    }
}
exports.FileUpdate = FileUpdate;
