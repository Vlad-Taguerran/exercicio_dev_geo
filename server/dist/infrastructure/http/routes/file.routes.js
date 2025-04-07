"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fileRoutes;
const express_1 = require("express");
const FilesController_1 = require("../../../application/controllers/FilesController");
const FileRepository_1 = require("../../database/repositories/FileRepository");
function fileRoutes(ws) {
    const filesRouter = (0, express_1.Router)();
    const fileRepository = new FileRepository_1.FileRepository();
    const filecontroller = new FilesController_1.FileController(fileRepository, ws);
    filesRouter.post('/process/file', (req, res) => { filecontroller.processFiles(req, res); });
    filesRouter.get('/files', (req, res) => { filecontroller.get(req, res); });
    filesRouter.get('/file/:filename', (req, res) => { filecontroller.getFile(req, res); });
    return filesRouter;
}
