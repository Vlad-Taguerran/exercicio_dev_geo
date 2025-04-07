"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesGetUseCase = void 0;
class FilesGetUseCase {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async execute() {
        const files = await this.fileRepository.getFiles();
        return files;
    }
}
exports.FilesGetUseCase = FilesGetUseCase;
