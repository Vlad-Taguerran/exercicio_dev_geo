import { Router } from "express";
import { UserController } from "../../../application/controllers/UserController";
import { UserRepository } from "../../database/repositories/UserRepository";

const userRoutes = Router();
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

userRoutes.post("/user",(req,res)=> {userController.create(req,res)});
userRoutes.get('/user', (req, res) => {
  res.json({ message: 'User route is working' });
});

export default userRoutes;