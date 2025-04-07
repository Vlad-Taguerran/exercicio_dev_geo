"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInitializer = void 0;
const FileRepository_1 = require("./../database/repositories/FileRepository");
const path_1 = __importDefault(require("path"));
const FilesConfigure_1 = require("../config/FilesConfigure");
const FileSystem_1 = require("../filesystem/FileSystem");
const logHelpers_1 = require("../config/logHelpers");
const File_1 = require("../../domain/entities/File");
class DataInitializer {
    constructor() {
        this.fileRepository = new FileRepository_1.FileRepository();
    }
    async run() {
        try {
            const files = FileSystem_1.FileSystemService.getCsvFiles(FilesConfigure_1.FILES_DIRECTORY);
            for (const filename of files) {
                const filePath = path_1.default.join(FilesConfigure_1.FILES_DIRECTORY, filename);
                const exists = await this.fileRepository.exists(filename);
                if (!exists) {
                    await this.fileRepository.save(new File_1.File(filename, filePath));
                    (0, logHelpers_1.logInfo)(`📂 Arquivo registrado: ${filename}`);
                }
                else {
                    (0, logHelpers_1.logSuccess)(`✅ Arquivo já registrado: ${filename}`);
                }
            }
        }
        catch (error) {
            (0, logHelpers_1.logError)('Erro ao buscar arquivos no diretorio', error);
        }
    }
}
exports.DataInitializer = DataInitializer;
