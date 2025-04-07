"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepository = void 0;
const FileGetDto_1 = require("../../../application/dtos/file/FileGetDto");
const FileModel_1 = require("../models/FileModel");
class FileRepository {
    async findByName(filename) {
        const find = await FileModel_1.FileModel.findOne({ where: { filename } });
        if (!find) {
            throw new Error("Arquivo não encontrado");
        }
        return new FileGetDto_1.FileGetDto(find?.id, find?.filename, find?.path, find?.createdAt);
    }
    async getFiles() {
        const files = await FileModel_1.FileModel.findAll();
        const res = files.map(file => new FileGetDto_1.FileGetDto(file.id, file.filename, file.path, file.createdAt));
        return res;
    }
    async save(file) {
        const exist = await FileModel_1.FileModel.create({ filename: file.filename, path: file.path });
        return;
    }
    async exists(filename) {
        const file = await FileModel_1.FileModel.findOne({ where: { filename } });
        return !!file;
    }
}
exports.FileRepository = FileRepository;
