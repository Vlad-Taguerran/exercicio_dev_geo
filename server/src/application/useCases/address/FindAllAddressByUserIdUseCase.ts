import { IAddressRepository } from "../../../domain/repositories/IAddressRepository";
import { AddressMapper } from "../../mappers/AddressMapper";

export class FindAllAddressByUserIdUseCase{
  constructor(private addressRepository :IAddressRepository){}

  async execute(userId:string){
    try {
      return await this.addressRepository.findAllByUserId(userId);     
    } catch (error) {
      throw new Error("Error ao persistir Adress")
    }
   }
}