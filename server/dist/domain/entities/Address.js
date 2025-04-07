"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const ConflictError_1 = require("../../application/erros/ConflictError");
class Address {
    constructor(id, house_number, address, city, state, postcode, location, userId, notes) {
        this.id = id;
        this.house_number = house_number;
        this.address = address;
        this.city = city;
        this.state = state;
        this.postcode = postcode;
        this.location = location;
        this.userId = userId;
        this.notes = notes;
    }
    getId() {
        return this.id;
    }
    getUserId() {
        return this.userId;
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
    assignToUser(userId) {
        if (userId == '' || userId == undefined) {
            throw new ConflictError_1.ConflictError("userId is Empity");
        }
        this.userId = userId;
    }
    getNotes() {
        return this.notes;
    }
    updatePartial(data) {
        if (data.house_number !== undefined)
            this.house_number = data.house_number;
        if (data.address !== undefined)
            this.address = data.address;
        if (data.city !== undefined)
            this.city = data.city;
        if (data.state !== undefined)
            this.state = data.state;
        if (data.postcode !== undefined)
            this.postcode = data.postcode;
    }
}
exports.Address = Address;
