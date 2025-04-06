import { CreateAddressUseCase } from "../useCases/address/CreateAddressUseCase";
import { AddressPostDto } from '../dtos/address/AddressPostDto';
import { Request, Response } from 'express';
import { AddressMapper } from '../mappers/AddressMapper';
import { IAddressRepository } from '../../domain/repositories/IAddressRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { FindAllAddressByUserIdUseCase } from "../useCases/address/FindAllAddressByUserIdUseCase";
import { Address } from "../../domain/entities/Address";
import { sseController } from "../../infrastructure/controller/SSEController";

export class AddressController{
 
  private  createAddresUseCase:  CreateAddressUseCase;
  private findAllAddressByuserId : FindAllAddressByUserIdUseCase;

  constructor(
    private  addressRepository :IAddressRepository,
    private  userRepository: IUserRepository
  ){
    this.createAddresUseCase = new CreateAddressUseCase(this.addressRepository,this.userRepository)
    this.findAllAddressByuserId = new FindAllAddressByUserIdUseCase(this.addressRepository);
  }

  async create(req: Request, res: Response ){
    try {
      const {userId} =  req.params;
      const {address, house_number, city, state, postcode, long, lat} = req.body;

      const toSave = new Address(address, house_number, city, state, postcode, long, lat);
      toSave.assignToUser(userId);
      const  saved = await this.createAddresUseCase.execute(toSave);
      
      sseController.notify(AddressMapper.toGetDto(saved));
      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro No Servidor" });
    }
  }

  async findAllByUserId(req: Request, res: Response){
   try {
    const userId = req.params.userId;
    const addresList = await this.findAllAddressByuserId.execute(userId);
    const dtoList = addresList.map((toGet)=> AddressMapper.toGetDto(toGet));
    return res.json(dtoList);
   } catch (error) {
    return res.status(500).send("Erro no servidor");
   }
  }
}