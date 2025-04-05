import { Router } from "express";
import { sseController } from "../../controller/SSEController";

const sseRouter = Router();

sseRouter.get('/address',(req,res)=>sseController.connect(req,res));
export default sseRouter;