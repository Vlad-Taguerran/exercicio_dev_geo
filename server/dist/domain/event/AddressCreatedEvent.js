"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressCreatedEvent = void 0;
class AddressCreatedEvent {
    constructor(id, address, house_number, city, state, postcode, lat, long) {
        this.id = id;
        this.address = address;
        this.house_number = house_number;
        this.city = city;
        this.state = state;
        this.postcode = postcode;
        this.lat = lat;
        this.long = long;
    }
}
exports.AddressCreatedEvent = AddressCreatedEvent;
