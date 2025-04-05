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
    constructor(filePath, wsServer) {
        this.filePath = filePath;
        this.wsServer = wsServer;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batchSize = 500;
                ReadData_service_1.CsvReader.readCsv(this.filePath, CensusDataToDto_1.CensusDataToDto.fromCsv, this.onBatchProcessed.bind(this), batchSize);
            }
            catch (error) {
            }
            finally {
                return { "message": "Reading csv" };
            }
        });
    }
    onBatchProcessed(batch) {
        if (batch.length == 0) {
            // this.wsServer.close();
        }
        this.wsServer.sendMessageToAll(JSON.stringify(batch));
    }
}
exports.ReadCsvUseCase = ReadCsvUseCase;
