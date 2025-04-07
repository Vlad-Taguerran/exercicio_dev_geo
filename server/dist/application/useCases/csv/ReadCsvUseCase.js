"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCsvUseCase = void 0;
const ReadData_service_1 = require("../../../infrastructure/services/ReadData.service");
const CensusDataToDto_1 = require("../../dtos/csv/CensusDataToDto");
class ReadCsvUseCase {
    constructor(filePath, wsServer) {
        this.filePath = filePath;
        this.wsServer = wsServer;
    }
    async execute() {
        try {
            const batchSize = 500;
            ReadData_service_1.CsvReader.readCsv(this.filePath, CensusDataToDto_1.CensusDataToDto.fromCsv, this.onBatchProcessed.bind(this), batchSize);
        }
        catch (error) {
        }
        finally {
            return { "message": "Reading csv" };
        }
    }
    onBatchProcessed(batch) {
        if (batch.length == 0) {
            // this.wsServer.close();
        }
        this.wsServer.sendMessageToAll(JSON.stringify(batch));
    }
}
exports.ReadCsvUseCase = ReadCsvUseCase;
