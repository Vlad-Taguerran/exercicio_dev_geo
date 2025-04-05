import { Router } from "express";
import { authenticateMiddleware } from "../../middlewares/authMiddleware";
import { AddressController } from "../../../application/controllers/AddressController";
import { AddressRepository } from "../../database/repositories/AddressRepository";
import { UserRepository } from "../../database/repositories/UserRepository";

const addressRoute = Router();
const addresRepository = new AddressRepository();
const userRepository = new UserRepository();
const addressController = new AddressController(addresRepository,userRepository);

addressRoute.post('/address/:userId',authenticateMiddleware,(req,res)=>{addressController.create(req,res)});
addressRoute.get('/address/:userId',authenticateMiddleware,(req,res)=>{addressController.findAllByUserId(req,res)});
export default addressRoute;