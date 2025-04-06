import { Address } from './../../../domain/entities/Address';
import { IAddressRepository } from "../../../domain/repositories/IAddressRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { NotFoundError } from '../../erros/NotFoundError';
import { UnauthorizedError } from '../../erros/UnauthorizedError';

export class UpdateAddressUseCase{
  constructor(
  private addressrepository : IAddressRepository,
  private userRepository: IUserRepository
  ){}
  async execute(toUpdate :Address){
    const address = await this.addressrepository.findById(toUpdate.getId())
    const user = await this.userRepository.findById(toUpdate.getUserId()!);
    if(!user){
      throw new NotFoundError('User Not Found');
    }
    if(!address){
      throw new NotFoundError('Address Not Found');
    }
    if(user.id !== address.getUserId()){
      throw new UnauthorizedError();
    }

    this.addressrepository.update(address)
  }
}