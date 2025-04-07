"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileGetDto = void 0;
class FileGetDto {
    constructor(id, filename, path, createdAt) {
        this.id = id;
        this.filename = filename;
        this.path = path;
        this.createdAt = createdAt;
    }
}
exports.FileGetDto = FileGetDto;
