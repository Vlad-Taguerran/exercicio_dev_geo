import { Address } from '../../../domain/entities/Address';
import { IAddressRepository } from "../../../domain/repositories/IAddressRepository";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { NotFoundError } from '../../erros/NotFoundError';
import { UnauthorizedError } from '../../erros/UnauthorizedError';
import { AddressUpdateDto } from '../../dtos/address/AddressUpdateDto';

export class UpdateAddressUseCase{
  constructor(
  private addressRepository : IAddressRepository,
  private userRepository: IUserRepository
  ){}
  
  async execute(data: AddressUpdateDto): Promise<Address> {
    const address = await this.addressRepository.findById(data.id!);
    if (!address) {
      throw new NotFoundError("Address Not Found");
    }

    const user = await this.userRepository.findById(data.userId!);
    if (!user) {
      throw new NotFoundError("User Not Found");
    }

    if (address.getUserId() !== data.userId) {
      throw new UnauthorizedError();
    }

    address.updatePartial({
      house_number: data.house_number,
      address: data.address,
      city: data.city,
      state: data.state,
      postcode: data.postcode,
      
    });

   return await this.addressRepository.update(address);
  }
}