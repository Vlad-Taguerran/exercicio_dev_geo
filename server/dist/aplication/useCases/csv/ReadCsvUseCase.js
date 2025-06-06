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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCsvUseCase = void 0;
const ReadData_service_1 = require("../../../infrastructure/services/ReadData.service");
const CensusDataToDto_1 = require("../../dtos/csv/CensusDataToDto");
class ReadCsvUseCase {
    constructor(filePath) {
        this.filePath = filePath;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const dtos = yield ReadData_service_1.CsvReader.readCsv(this.filePath, CensusDataToDto_1.CensusDataToDto.fromCsv);
            return dtos.map((dto) => dto.toEntity());
        });
    }
}
exports.ReadCsvUseCase = ReadCsvUseCase;
