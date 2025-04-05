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
exports.ProcessFilesUseCase = void 0;
const path_1 = __importDefault(require("path"));
const FileSystem_1 = require("../../../infrastructure/filesystem/FileSystem");
const File_1 = require("../../../domain/entities/File");
const FilesConfigure_1 = require("../../../infrastructure/config/FilesConfigure");
class ProcessFilesUseCase {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    execute(folderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(FilesConfigure_1.FILES_DIRECTORY);
            const files = FileSystem_1.FileSystemService.getCsvFiles(FilesConfigure_1.FILES_DIRECTORY);
            for (const filename of files) {
                console.log(filename);
                const filePath = path_1.default.join(folderPath, filename);
                const exists = yield this.fileRepository.exists(filename);
                if (!exists) {
                    yield this.fileRepository.save(new File_1.File(filename, filePath));
                    console.log(`📂 Arquivo registrado: ${filename}`);
                }
                else {
                    console.log(`✅ Arquivo já registrado: ${filename}`);
                }
            }
        });
    }
}
exports.ProcessFilesUseCase = ProcessFilesUseCase;
