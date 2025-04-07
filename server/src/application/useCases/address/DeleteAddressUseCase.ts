import { UserRepository } from './../../../infrastructure/database/repositories/UserRepository';
import { AddressRepository } from './../../../infrastructure/database/repositories/AddressRepository';
import { NotFoundError } from '../../erros/NotFoundError';
import { UnauthorizedError } from '../../erros/UnauthorizedError';
export class DeleteAddressUseCase{
  constructor(private addressRespository :AddressRepository, private userRepository :UserRepository){}

  async execute(addressId:string , userId:string){
    const address = await this.addressRespository.findById(addressId);
    if(!address){
      throw new NotFoundError('Address Not Found');
    }
    const user = await this.userRepository.findById(userId);
    if(!user){
      throw new NotFoundError('User Not Found');
    }
    if(user.id !== address.getUserId())
      throw new UnauthorizedError();
  }
}