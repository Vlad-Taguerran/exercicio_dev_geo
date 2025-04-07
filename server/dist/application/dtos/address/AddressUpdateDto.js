"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressUpdateDto = void 0;
class AddressUpdateDto {
    constructor(id, userId, house_number, address, city, state, postcode, notes) {
        this.id = id;
        this.userId = userId;
        this.house_number = house_number;
        this.address = address;
        this.city = city;
        this.state = state;
        this.postcode = postcode;
        this.notes = notes;
    }
}
exports.AddressUpdateDto = AddressUpdateDto;
