import { Router } from "express";
import { AuthController } from "../../../application/controllers/AuthController";
import { UserRepository } from "../../database/repositories/UserRepository";
import { HashService } from "../../services/HashService..service";

const authRoute = Router();
const userRepository = new UserRepository();
const hashService = new HashService();
const userController = new AuthController(userRepository,hashService);

authRoute.post('/auth',(req,res)=>{userController.loging(req,res)})

export default authRoute;