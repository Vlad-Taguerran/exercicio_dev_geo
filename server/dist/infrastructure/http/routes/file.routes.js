"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fileRoutes;
const express_1 = require("express");
const FilesController_1 = require("../../../application/controllers/FilesController");
const FileRepository_1 = require("../../database/repositories/FileRepository");
const FilesProcessUseCase_1 = require("../../../application/useCases/Files/FilesProcessUseCase");
const FilesGetUseCase_1 = require("../../../application/useCases/Files/FilesGetUseCase");
const FilesfindByNameUseCase_1 = require("../../../application/useCases/Files/FilesfindByNameUseCase");
function fileRoutes(ws) {
    const filesRouter = (0, express_1.Router)();
    const fileRepository = new FileRepository_1.FileRepository();
    const fileuseCase = new FilesProcessUseCase_1.ProcessFilesUseCase(fileRepository);
    const filesGet = new FilesGetUseCase_1.FilesGetUseCase(fileRepository);
    const filesFindByName = new FilesfindByNameUseCase_1.FilesfindByNameUseCase(fileRepository);
    const userController = new FilesController_1.FileController(fileuseCase, filesGet, ws, filesFindByName);
    filesRouter.post('/process/file', (req, res) => { userController.processFiles(req, res); });
    filesRouter.get('/files', (req, res) => { userController.get(req, res); });
    filesRouter.get('/file/:filename', (req, res) => { userController.getFile(req, res); });
    return filesRouter;
}
