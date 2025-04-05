import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { sseController } from '../../../infrastructure/controller/SSEController';
import { AddressPostDto } from '../../dtos/address/AddressPostDto';
import { AddressMapper } from '../../mappers/AddressMapper';
import { IAddressRepository } from '../../../domain/repositories/IAddressRepository';
export class CreateAddressUseCase{
  constructor(private addressRepository :IAddressRepository, private userRepository: IUserRepository){}

  async execute(address:AddressPostDto, userId:string){
    try {
      const user = await this.userRepository.findById(userId);
      if(!user){
        throw  new Error("Usuario não encontrado");
      }
      const savadeAddress =  await this.addressRepository.create(address,user);
      const responseDto = AddressMapper.toGetDto(savadeAddress);
      sseController.notify(responseDto);
    } catch (error) {
      throw new Error("Error ao persistir Adress")
    }
   }

}