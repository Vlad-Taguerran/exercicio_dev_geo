"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILES_DIRECTORY = void 0;
const path_1 = __importDefault(require("path"));
exports.FILES_DIRECTORY = path_1.default.resolve(__dirname, "..", "..", "..", "files");
/*if (!fs.existsSync(FILES_DIRECTORY)) {
  fs.mkdirSync(FILES_DIRECTORY, { recursive: true });
  console.log(`📂 Pasta criada: ${FILES_DIRECTORY}`);
}
*/ 
