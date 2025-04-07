"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressMapper = void 0;
const Address_1 = require("../../domain/entities/Address");
const AddressGetDto_1 = require("../dtos/address/AddressGetDto");
class AddressMapper {
    static toGetDto(address) {
        return new AddressGetDto_1.AddressGetDto(address.getId(), address.getAddress(), address.getHouseNumber(), address.getCity(), address.getState(), address.getPostcode(), address.getLocation().latitude.toString(), address.getLocation().longitude.toString());
    }
    static toGetDtoList(addresses) {
        return addresses.map(this.toGetDto);
    }
    static toDomain(addressModel) {
        return new Address_1.Address(addressModel.id, addressModel.house_number, addressModel.address, addressModel.city, addressModel.state, addressModel.postcode, {
            latitude: addressModel.location.coordinates[1],
            longitude: addressModel.location.coordinates[0],
        });
    }
}
exports.AddressMapper = AddressMapper;
