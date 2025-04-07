"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class FileStorage {
    constructor() {
        this.uploadPath = path_1.default.resolve("files");
    }
    async save(file) {
        await promises_1.default.mkdir(this.uploadPath, { recursive: true });
        const targetPath = path_1.default.join(this.uploadPath, file.originalname);
        await promises_1.default.rename(file.path, targetPath);
    }
}
exports.FileStorage = FileStorage;
