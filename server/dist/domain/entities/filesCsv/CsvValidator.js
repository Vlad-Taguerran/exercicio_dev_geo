"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvValidator = void 0;
const fs_1 = __importDefault(require("fs"));
const papaparse_1 = __importDefault(require("papaparse"));
class CsvValidator {
    async validate(filePath) {
        const content = fs_1.default.readFileSync(filePath, "utf-8");
        const delimitersToTry = [",", ";", "\t"];
        for (const delimiter of delimitersToTry) {
            const { data, errors } = papaparse_1.default.parse(content, {
                delimiter,
                header: true,
                skipEmptyLines: true,
            });
            if (errors.length === 0) {
                const headers = Object.keys(data[0] || {});
                const hasLat = headers.includes("latitude");
                const hasLon = headers.includes("longitude");
                const hasKeywords = headers.some((h) => ["casa", "agro"].some((kw) => h.toLowerCase().includes(kw)));
                if (hasLat && hasLon && hasKeywords) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.CsvValidator = CsvValidator;
