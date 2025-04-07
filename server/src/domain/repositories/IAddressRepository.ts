import { promises } from 'dns';
import { Address } from './../entities/Address';


export interface IAddressRepository{
  create(address: Address) :Promise<Address>;
  update(toUpdate:Address): Promise<Address>;
  findAllByUserId(userId:string): Promise<Address[]>;
  findById(addressId: string ): Promise<Address | null>;
} 