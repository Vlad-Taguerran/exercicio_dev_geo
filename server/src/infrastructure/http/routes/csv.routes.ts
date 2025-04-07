import { FileUpdate } from './../../../application/useCases/Files/FileUpdateUseCase';
import { WebSocketInterface } from '../../../application/interfaces/WebSocket';
import { validateCsvFile } from '../../../shared/middleware/ValidateCsvfie';
import { WebSocketServer } from '../../websocket/WebSocketServer';
import { CsvController } from '../../../application/controllers/CsvController';
import { ReadCsvUseCase } from '../../../application/useCases/csv/ReadCsvUseCase';
import { Router } from 'express';
import path from 'path'
import { authenticateMiddleware } from '../../middlewares/authMiddleware';
import multer from 'multer';
import { FileRepository } from '../../database/repositories/FileRepository';
import { CsvValidator } from '../../../domain/entities/filesCsv/CsvValidator';

export default function csvRouter(ws: WebSocketInterface) {
  const router = Router();
  const upload = multer({ dest: "files/" });

const filePath = path.resolve("../files/base_jales_separado_virgula.csv");
const readCsvUseCase = new ReadCsvUseCase(filePath,ws);
const fileRepository =new FileRepository();
const validate =  new CsvValidator
const fileUpdate = new FileUpdate(fileRepository,validate);
const csvController = new CsvController(readCsvUseCase, fileUpdate);

router.get("/csv",authenticateMiddleware,(req,res)=>{csvController.getCensu(req,res)})
router.post("/csv",upload.single("file"),authenticateMiddleware,(req,res)=>{})
return router;
}