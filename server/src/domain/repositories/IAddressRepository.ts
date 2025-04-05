import { AddressPostDto } from "../../application/dtos/address/AddressPostDto";
import { Address } from "../entities/Address";
import { User } from "../entities/User";

export interface IAddressRepository{
  create(address: AddressPostDto, user:User) :Promise<Address>
  findAllByUserId(userId:string): Promise<Address[]>
} 