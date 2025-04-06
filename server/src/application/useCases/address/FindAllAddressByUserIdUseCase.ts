import { IAddressRepository } from "../../../domain/repositories/IAddressRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { NotFoundError } from "../../erros/NotFoundError";
import { AddressMapper } from "../../mappers/AddressMapper";

export class FindAllAddressByUserIdUseCase{
  constructor(private addressRepository :IAddressRepository,private userRepository: IUserRepository){}

  async execute(userId:string){
    const user = await this.userRepository.findById(userId);
    if(!user) throw new NotFoundError("User Not Found")
    try {
      return await this.addressRepository.findAllByUserId(userId);     
    } catch (error) {
      throw new Error("Error ao persistir Adress")
    }
   }
}