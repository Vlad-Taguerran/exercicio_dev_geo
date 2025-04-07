"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressGetDto = void 0;
class AddressGetDto {
    constructor(id, address, house_number, city, state, postcode, latitude, longitude) {
        this.id = id;
        this.address = address;
        this.house_number = house_number;
        this.city = city;
        this.state = state;
        this.postcode = postcode;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
exports.AddressGetDto = AddressGetDto;
