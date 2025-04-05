"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = csvRouter;
const CsvController_1 = require("../../../application/controllers/CsvController");
const ReadCsvUseCase_1 = require("../../../application/useCases/csv/ReadCsvUseCase");
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
function csvRouter(ws) {
    const router = (0, express_1.Router)();
    ws.start();
    const filePath = path_1.default.resolve("../files/base_jales_separado_virgula.csv");
    const readCsvUseCase = new ReadCsvUseCase_1.ReadCsvUseCase(filePath, ws);
    const csvController = new CsvController_1.CsvController(readCsvUseCase);
    router.get("/csv", authMiddleware_1.authenticateMiddleware, (req, res) => {
        csvController.getCensu(req, res);
    });
    return router;
}
