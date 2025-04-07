import { CreateAddressUseCase } from "../useCases/address/CreateAddressUseCase";
import { Request, Response } from 'express';
import { AddressMapper } from '../mappers/AddressMapper';
import { IAddressRepository } from '../../domain/repositories/IAddressRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { FindAllAddressByUserIdUseCase } from "../useCases/address/FindAllAddressByUserIdUseCase";
import { Address } from "../../domain/entities/Address";
import { sseController } from "../../infrastructure/controller/SSEController";
import { UpdateAddressUseCase } from "../useCases/address/UpdateAddressUseCase";
import { AddressUpdateDto } from "../dtos/address/AddressUpdateDto";
import { DeleteAddressUseCase } from "../useCases/address/DeleteAddressUseCase";
import { NotFoundError } from "../erros/NotFoundError";
import { UnauthorizedError } from "../erros/UnauthorizedError";
import { handleHttpError } from "../erros/HttpErrorHandler";
import { logError } from "../../infrastructure/config/logHelpers";

export class AddressController{
 
  private  createAddresUseCase:  CreateAddressUseCase;
  private findAllAddressByUserId : FindAllAddressByUserIdUseCase;
  private updateAddressUseCase : UpdateAddressUseCase;
  private deleteAddressUseCase : DeleteAddressUseCase;
  constructor(
    private  addressRepository :IAddressRepository,
    private  userRepository: IUserRepository
  ){
    this.createAddresUseCase = new CreateAddressUseCase(this.addressRepository,this.userRepository)
    this.findAllAddressByUserId = new FindAllAddressByUserIdUseCase(this.addressRepository,this.userRepository);
    this.updateAddressUseCase = new UpdateAddressUseCase(addressRepository,userRepository);
    this.deleteAddressUseCase = new DeleteAddressUseCase(addressRepository,userRepository);
  }

  async create(req: Request, res: Response ){
    try {
      const { userId } = req.params;
      const {
        address,
        house_number,
        city,
        state,
        postcode,
        lat,
        long,
        notes
      } = req.body;
  
      
      const toSave = new Address(
        "", 
        house_number,
        address,
        city,
        state,
        postcode,
        {
          latitude: parseFloat(lat),
          longitude: parseFloat(long)
        },
        undefined,
        notes
      );
  
      toSave.assignToUser(userId);
  
      const saved = await this.createAddresUseCase.execute(toSave);
  
      sseController.notify(AddressMapper.toGetDto(saved));
      return res.status(201).send();
  
    } catch (error) {
      return handleHttpError(error, res);
    }
  };

  async findAllByUserId(req: Request, res: Response){
   try {
    const userId = req.params.userId;
    const addresList = await this.findAllAddressByUserId.execute(userId);
    const dtoList = AddressMapper.toGetDtoList(addresList);
    return res.json(dtoList);
   } catch (error) {
    logError(`[ADDRESSCONTROLLER] `, error);
    return handleHttpError(error,res);
   }
  };
  async updateAddress(req:Request,res:Response){
    const {addresId} = req.params;
    const userId = req.user?.userId;
    if(!userId){
      return res.status(404).json('User Not Found');
    }
   try {
    const dto = req.body as AddressUpdateDto;
    dto.id = addresId,
    dto.userId = userId!;
   const address = await this.updateAddressUseCase.execute(dto);

   return res.json(AddressMapper.toGetDto(address));
   } catch (error) {
    
    return handleHttpError(error,res);
   }
  };
  async deleteAddress(req:Request,res:Response){
    const {addressId} = req.body;
    const userId = req.user?.userId;
    if(!userId){
      return res.json
    }
    if (!userId) {
      return res.status(404).json("User Not Found");
    }
  
    try {
      await this.deleteAddressUseCase.execute(addressId, userId);
      return res.status(204).send(); 
    } catch (error) {
     return handleHttpError(error,res);
    }
  }
}
