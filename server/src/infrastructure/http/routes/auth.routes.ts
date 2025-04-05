import { Router } from "express";
import { AuthController } from "../../../application/controllers/AuthController";
import { UserRepository } from "../../database/repositories/UserRepository";

const authRoute = Router();
const userRepository = new UserRepository()
const userController = new AuthController(userRepository);

authRoute.post('/auth',(req,res)=>{userController.loging(req,res)})

export default authRoute;