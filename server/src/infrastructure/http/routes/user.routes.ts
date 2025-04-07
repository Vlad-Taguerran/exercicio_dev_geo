import { Router } from "express";
import { UserController } from "../../../application/controllers/UserController";
import { UserRepository } from "../../database/repositories/UserRepository";
import { HashService } from "../../services/HashService..service";

const userRoutes = Router();
const userRepository = new UserRepository();
const hashService = new HashService();
const userController = new UserController(userRepository,hashService);

userRoutes.post("/user",(req,res)=> {userController.create(req,res)});
userRoutes.get("/user/email", (req, res) => {userController.findByEmail(req, res)});
userRoutes.get("/user/:id", (req, res) => {userController.findById(req, res)});
userRoutes.put("/user", (req, res) => {userController.update(req, res)});

export default userRoutes;