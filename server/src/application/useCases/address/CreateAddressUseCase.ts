import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAddressRepository } from '../../../domain/repositories/IAddressRepository';
import { Address } from '../../../domain/entities/Address';
import { NotFoundError } from '../../erros/NotFoundError';
export class CreateAddressUseCase{
  constructor(private addressRepository :IAddressRepository, private userRepository: IUserRepository){}

  async execute(address:Address){
    const user = await this.userRepository.findById(address.getUserId()!);
      if(!user){
        throw  new NotFoundError('User Not Found');
      }
    try {
      
      const savedAddress =  await this.addressRepository.create(address);
      return savedAddress;
    } catch (error) {
      throw new Error("Server Error")
    }
   }

}