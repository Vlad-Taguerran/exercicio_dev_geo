"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressPostDto = void 0;
class AddressPostDto {
    constructor(address, house_number, city, state, postcode, long, lat) {
        this.address = address;
        this.house_number = house_number;
        this.city = city;
        this.state = state;
        this.postcode = postcode;
        this.long = long;
        this.lat = lat;
    }
}
exports.AddressPostDto = AddressPostDto;
