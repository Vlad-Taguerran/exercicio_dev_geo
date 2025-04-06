import { IAddressRepository } from "../../../domain/repositories/IAddressRepository";
import { AddressModel } from "../models/AddressModel";
import { Address } from '../../../domain/entities/Address';
import { sequelize } from '../sequelize';
import { AddressMapper } from '../../../application/mappers/AddressMapper';
import { logError } from '../../config/logHelpers';
import { NotFoundError } from '../../../application/erros/NotFoundError';

export class AddressRepository implements IAddressRepository {

  async create(address: Address): Promise<Address> {
    const transaction = await sequelize.transaction();
    try {
      const userId = address.getUserId();
      if (!userId) throw new Error("User ID is missing in address");


      const addressModel = await AddressModel.create({
        id: address.getId(),
        address: address.getAddress(),
        house_number: address.getHouseNumber(),
        city: address.getCity(),
        state: address.getState(),
        postcode: address.getPostcode(),
        location: {
          type: "Point",
          coordinates: [parseFloat(address.getLocation().longitude.toString()), parseFloat(address.getLocation().latitude.toString())],
        },
        userId: userId
      }, { transaction })
      await transaction.commit();
      return AddressMapper.toDomain(addressModel);
    } catch (error: any) {
      logError('Erro no repositoryo Address ', error)
      await transaction.rollback();
      throw new Error(`Erro ao criar endereço: ${error.message}`);
    }
  }
  async findAllByUserId(userId: string): Promise<Address[]> {
    try {
      const addressModel = await AddressModel.findAll({ where: { 'userId': userId } });
      const addresses = addressModel.map((model) => AddressMapper.toDomain(model))
      return addresses;

    } catch (error) {
      throw new Error(`Erro ao buscar endereçços`)
    }
  }

  async update(toUpdate: Address): Promise<Address>{
   const addressModel = await  AddressModel.findByPk(toUpdate.getId());
   if (!addressModel) throw new NotFoundError("Address not found");
    addressModel.notes = toUpdate.getNotes();
    
    addressModel.save();
    return AddressMapper.toDomain(addressModel);
  }

  async findById(addressId: string):Promise<Address | null>{
    const adddressModel = await AddressModel.findByPk(addressId);
    if(!adddressModel){
      return null;
    }
   return AddressMapper.toDomain(adddressModel);

  }
}