import { Router } from "express";
import { UserController } from "../../../aplication/controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/user",(req,res)=> userController.create(req,res));

export default userRoutes;