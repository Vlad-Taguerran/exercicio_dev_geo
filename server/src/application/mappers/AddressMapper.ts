import { Address } from "../../domain/entities/Address";
import { AddressModel } from "../../infrastructure/database/models/AddressModel";
import { AddressGetDto } from "../dtos/address/AddressGetDto";

export class AddressMapper {
  static toGetDto(address: Address): AddressGetDto {
  
   return new AddressGetDto(
      address.getId(),
      address.getAddress(),
      address.getHouseNumber(),
      address.getCity(),
      address.getState(),
      address.getPostcode(),
      address.getLocation().latitude.toString(),
      address.getLocation().longitude.toString()
    );
  }
  static toGetDtoList(addresses: Address[]): AddressGetDto[] {
    return addresses.map(this.toGetDto);
  }
  static toDomain(addressModel: AddressModel): Address {
    return new Address(
      addressModel.id,
      addressModel.house_number,
      addressModel.address,
      addressModel.city,
      addressModel.state,
      addressModel.postcode,
      {
        latitude: addressModel.location.coordinates[1],
        longitude: addressModel.location.coordinates[0],
      }
    );
  }

 
}
