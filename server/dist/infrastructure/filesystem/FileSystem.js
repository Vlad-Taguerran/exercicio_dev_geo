"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileSystemService {
    static getCsvFiles(directory) {
        try {
            const folderPath = path_1.default.resolve(directory);
            return fs_1.default.readdirSync(folderPath).filter(file => file.endsWith(".csv"));
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.FileSystemService = FileSystemService;
