"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvReader = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
const FilesConfigure_1 = require("../config/FilesConfigure");
const path_1 = __importDefault(require("path"));
class CsvReader {
    static async readCsv(_filePath, mapRow, onBatchProcessed, batchSize = 100) {
        const filepath = path_1.default.join(FilesConfigure_1.FILES_DIRECTORY, _filePath);
        const delimiter = await this.detectTypeSeparator(filepath);
        let batch = [];
        let lineCount = 0;
        return new Promise((resolve, rejects) => {
            fs_1.default.createReadStream(filepath).pipe((0, csv_parse_1.parse)({ delimiter: delimiter, columns: true, trim: true }))
                .on("data", (row) => {
                batch.push(mapRow(row));
                lineCount++;
                if (batch.length == batchSize) {
                    onBatchProcessed([...batch]);
                    batch = [];
                }
            })
                .on("end", () => {
                if (batch.length > 0) {
                    onBatchProcessed([...batch]);
                }
                onBatchProcessed([]);
            })
                .on("error", (err) => rejects(err.message));
        });
    }
    static detectTypeSeparator(filePath) {
        const separators = [',', '\t', ';'];
        try {
            return new Promise((resolve, reject) => {
                fs_1.default.createReadStream(filePath, { encoding: 'utf8', start: 0, end: 500 })
                    .on('data', (chunk) => {
                    const line = chunk.toString().split('\n')[0];
                    const separator = separators.find((sep) => line.includes(sep));
                    if (separator) {
                        resolve(separator);
                    }
                    else {
                        resolve(';');
                    }
                })
                    .on('error', (error) => reject(error.message));
            });
        }
        catch (error) {
            throw new Error("Erro ao ler CSV");
        }
    }
}
exports.CsvReader = CsvReader;
