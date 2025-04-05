"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
class File {
    constructor(filename, path, createdAt = new Date()) {
        this.filename = filename;
        this.path = path;
        this.createdAt = createdAt;
    }
}
exports.File = File;
