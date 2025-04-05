"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
class Address {
    constructor(id, house_number, address, city, state, postcode, location) {
        this.id = id;
        this.house_number = house_number;
        this.address = address;
        this.city = city;
        this.state = state;
        this.postcode = postcode;
        this.location = location;
    }
    getId() {
        return this.id;
    }
    getHouseNumber() {
        return this.house_number;
    }
    getAddress() {
        return this.address;
    }
    getCity() {
        return this.city;
    }
    getState() {
        return this.state;
    }
    getPostcode() {
        return this.postcode;
    }
    getLocation() {
        return this.location;
    }
}
exports.Address = Address;
