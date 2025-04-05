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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const CensusDataToDto_1 = require("../dtos/csv/CensusDataToDto");
const ReadData_service_1 = require("../../infrastructure/services/ReadData.service");
const path_1 = __importDefault(require("path"));
class FileController {
    constructor(processFilesUseCase, filesget, wsServer, findByName) {
        this.processFilesUseCase = processFilesUseCase;
        this.filesget = filesget;
        this.wsServer = wsServer;
        this.findByName = findByName;
    }
    processFiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const __file = path_1.default.resolve(__dirname, "..", "..", "files");
            console.log(__file);
            try {
                yield this.processFilesUseCase.execute(__file);
                return res.status(200).json({ message: "Arquivos processados com sucesso!" });
            }
            catch (error) {
                console.error("Erro ao processar arquivos:", error);
                return res.status(500).json({ message: "Erro ao processar arquivos" });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respose = yield this.filesget.execute();
                return res.status(200).json(respose);
            }
            catch (error) {
                return res.status(500).json({ message: "Erro ao processar arquivos" });
            }
        });
    }
    getFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filename } = req.params;
                const resFile = yield this.findByName.execute(filename);
                const batchSize = 500;
                ReadData_service_1.CsvReader.readCsv(resFile.filename, CensusDataToDto_1.CensusDataToDto.fromCsv, this.onBatchProcessed.bind(this), batchSize);
                return res.status(200).send();
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Erro ao processar arquivos" });
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
exports.FileController = FileController;
