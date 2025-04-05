import { WebSocketInterface } from '../../../application/interfaces/WebSocket';
import { validateCsvFile } from '../../../shared/middleware/ValidateCsvfie';
import { WebSocketServer } from '../../websocket/WebSocketServer';
import { CsvController } from '../../../application/controllers/CsvController';
import { ReadCsvUseCase } from '../../../application/useCases/csv/ReadCsvUseCase';
import { Router } from 'express';
import path from 'path'
import { authenticateMiddleware } from '../../middlewares/authMiddleware';

export default function csvRouter(ws: WebSocketInterface) {
  const router = Router();

const filePath = path.resolve("../files/base_jales_separado_virgula.csv");
const readCsvUseCase = new ReadCsvUseCase(filePath,ws);
const csvController = new CsvController(readCsvUseCase);

router.get("/csv",authenticateMiddleware,(req,res)=>{
  csvController.getCensu(req,res)
})
return router;
}