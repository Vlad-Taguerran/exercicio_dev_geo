import { UserModel } from './../models/UserModel';
import { AddressGetDto } from "../../../application/dtos/address/AddressGetDto";
import { AddressPostDto } from "../../../application/dtos/address/AddressPostDto";
import { IAddressRepository } from "../../../domain/repositories/IAddressRepository";
import { AddressModel } from "../models/AddressModel";
import { Address } from '../../../domain/entities/Address';
import { sequelize } from '../sequelize';
import { AddressMapper } from '../../../application/mappers/AddressMapper';
import { where } from 'sequelize';

export class AddressRepository implements IAddressRepository{
  
  async create(address: AddressPostDto, user :UserModel): Promise<Address> {
    const transaction = await sequelize.transaction();
    const {lat, long, ...data} = address;
    try {
    
   const addres = await AddressModel.create({
      ...data,
      location: {
        type: "Point",
        coordinates: [parseFloat(long), parseFloat(lat)], 
      },
      user: user,
      userId: user.id
    },{transaction})
    await transaction.commit();
    return AddressMapper.toDomain(addres);
   } catch (error:any) {
    console.log(error)
    await transaction.rollback();
      throw new Error(`Erro ao criar endereço: ${error.message}`);
   }
  }
 async  findAllByUserId(userId:string): Promise<Address[]> {
    try {
    const addressModel = await AddressModel.findAll({where:{'userId': userId}});
    const addresses = addressModel.map((model )=> AddressMapper.toDomain(model))
    return addresses;
    
    } catch (error) {
      throw new Error(`Erro ao buscar endereçços`)
    }
  }
}