"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesfindByNameUseCase = void 0;
class FilesfindByNameUseCase {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async execute(filename) {
        const files = await this.fileRepository.findByName(filename);
        return files;
    }
}
exports.FilesfindByNameUseCase = FilesfindByNameUseCase;
