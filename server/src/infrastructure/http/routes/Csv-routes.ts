import { WebSocketInterface } from './../../../aplication/interfaces/WebSocket';
import { validateCsvFile } from '../../../shared/middleware/ValidateCsvfie';
import { WebSocketServer } from '../../websocket/WebSocketServer';
import { CsvController } from './../../../aplication/controllers/CsvController';
import { ReadCsvUseCase } from './../../../aplication/useCases/csv/ReadCsvUseCase';
import { Router } from 'express';
import path from 'path'

export default function csvRouter(ws: WebSocketInterface) {
  const router = Router();
  ws.start();

const filePath = path.resolve("../files/base_jales_separado_virgula.csv");
const readCsvUseCase = new ReadCsvUseCase(filePath,ws);
const csvController = new CsvController(readCsvUseCase);

router.get("/csv",(req,res)=>{
  csvController.getCensu(req,res)
})
return router;
}