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
exports.FileRepository = void 0;
const FileGetDto_1 = require("../../../application/dtos/file/FileGetDto");
const FileModel_1 = require("../models/FileModel");
class FileRepository {
    findByName(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield FileModel_1.FileModel.findOne({ where: { filename } });
            if (!find) {
                throw new Error("Arquivo não encontrado");
            }
            return new FileGetDto_1.FileGetDto(find === null || find === void 0 ? void 0 : find.id, find === null || find === void 0 ? void 0 : find.filename, find === null || find === void 0 ? void 0 : find.path, find === null || find === void 0 ? void 0 : find.createdAt);
        });
    }
    getFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield FileModel_1.FileModel.findAll();
            const res = files.map(file => new FileGetDto_1.FileGetDto(file.id, file.filename, file.path, file.createdAt));
            return res;
        });
    }
    save(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield FileModel_1.FileModel.create({ filename: file.filename, path: file.path });
            return;
        });
    }
    exists(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield FileModel_1.FileModel.findOne({ where: { filename } });
            return !!file;
        });
    }
}
exports.FileRepository = FileRepository;
