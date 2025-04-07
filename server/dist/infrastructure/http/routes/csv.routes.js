"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = csvRouter;
const FileUpdateUseCase_1 = require("./../../../application/useCases/Files/FileUpdateUseCase");
const CsvController_1 = require("../../../application/controllers/CsvController");
const ReadCsvUseCase_1 = require("../../../application/useCases/csv/ReadCsvUseCase");
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const FileRepository_1 = require("../../database/repositories/FileRepository");
const CsvValidator_1 = require("../../../domain/entities/filesCsv/CsvValidator");
function csvRouter(ws) {
    const router = (0, express_1.Router)();
    const upload = (0, multer_1.default)({ dest: "files/" });
    const filePath = path_1.default.resolve("../files/base_jales_separado_virgula.csv");
    const readCsvUseCase = new ReadCsvUseCase_1.ReadCsvUseCase(filePath, ws);
    const fileRepository = new FileRepository_1.FileRepository();
    const validate = new CsvValidator_1.CsvValidator;
    const fileUpdate = new FileUpdateUseCase_1.FileUpdate(fileRepository, validate);
    const csvController = new CsvController_1.CsvController(readCsvUseCase, fileUpdate);
    router.get("/csv", authMiddleware_1.authenticateMiddleware, (req, res) => { csvController.getCensu(req, res); });
    router.post("/csv", upload.single("file"), authMiddleware_1.authenticateMiddleware, (req, res) => { });
    return router;
}
