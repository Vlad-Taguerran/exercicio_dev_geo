"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const FilesGetUseCase_1 = require("./../useCases/Files/FilesGetUseCase");
const FilesProcessUseCase_1 = require("../useCases/Files/FilesProcessUseCase");
const CensusDataToDto_1 = require("../dtos/csv/CensusDataToDto");
const ReadData_service_1 = require("../../infrastructure/services/ReadData.service");
const FilesfindByNameUseCase_1 = require("../useCases/Files/FilesfindByNameUseCase");
class FileController {
    constructor(fileRepository, wsServer) {
        this.fileRepository = fileRepository;
        this.wsServer = wsServer;
        this.batchIndex = 0;
        this.processFilesUseCase = new FilesProcessUseCase_1.ProcessFilesUseCase(this.fileRepository);
        this.filesget = new FilesGetUseCase_1.FilesGetUseCase(this.fileRepository);
        this.findByName = new FilesfindByNameUseCase_1.FilesfindByNameUseCase(this.fileRepository);
    }
    async processFiles(req, res) {
        try {
            await this.processFilesUseCase.execute();
            return res.status(200).json({ message: "Arquivos processados com sucesso!" });
        }
        catch (error) {
            console.error("Erro ao processar arquivos:", error);
            return res.status(500).json({ message: "Erro ao processar arquivos" });
        }
    }
    async get(req, res) {
        try {
            const respose = await this.filesget.execute();
            return res.status(200).json(respose);
        }
        catch (error) {
            return res.status(500).json({ message: "Erro ao processar arquivos" });
        }
    }
    async getFile(req, res) {
        try {
            const { filename } = req.params;
            const resFile = await this.findByName.execute(filename);
            const batchSize = 500;
            ReadData_service_1.CsvReader.readCsv(resFile.filename, CensusDataToDto_1.CensusDataToDto.fromCsv, this.onBatchProcessed.bind(this), batchSize);
            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erro ao processar arquivos" });
        }
    }
    onBatchProcessed(batch) {
        if (batch.length === 0) {
            return;
        }
        this.wsServer.sendMessageToAll(JSON.stringify({
            batch,
        }));
    }
}
exports.FileController = FileController;
