import { Router } from "express";
import { FileController } from "../../../application/controllers/FilesController";
import { FileRepository } from "../../database/repositories/FileRepository";
import { WebSocketInterface } from "../../../application/interfaces/WebSocket";

export default function fileRoutes(ws: WebSocketInterface) {

const filesRouter = Router();


const fileRepository =new FileRepository();

const filecontroller = new FileController(fileRepository,ws,);

filesRouter.post('/process/file',(req,res)=>{filecontroller.processFiles(req,res)});
//filesRouter.post('/file',(req,res)=>{filecontroller.})
filesRouter.get('/files',(req,res)=>{filecontroller.get(req,res)});
filesRouter.get('/file/:filename',(req,res)=>{filecontroller.getFile(req,res)})
return filesRouter;
}