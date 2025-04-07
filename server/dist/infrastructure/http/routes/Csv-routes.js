"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CsvController_1 = require("./../../../aplication/controllers/CsvController");
const ReadCsvUseCase_1 = require("./../../../aplication/useCases/csv/ReadCsvUseCase");
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const csvRouter = (0, express_1.Router)();
const filePath = path_1.default.resolve(__dirname, "/files/base_jales_separado_virgula.csv");
const readCsvUseCase = new ReadCsvUseCase_1.ReadCsvUseCase(filePath);
const csvController = new CsvController_1.CsvController(readCsvUseCase);
csvRouter.get("/csv", (req, res) => {
    csvController.getCensu(req, res);
});
exports.default = csvRouter;
