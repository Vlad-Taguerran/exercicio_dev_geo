"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddressUseCase = void 0;
const NotFoundError_1 = require("../../erros/NotFoundError");
const UnauthorizedError_1 = require("../../erros/UnauthorizedError");
class UpdateAddressUseCase {
    constructor(addressRepository, userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }
    async execute(data) {
        const address = await this.addressRepository.findById(data.id);
        if (!address) {
            throw new NotFoundError_1.NotFoundError("Address Not Found");
        }
        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("User Not Found");
        }
        if (address.getUserId() !== data.userId) {
            throw new UnauthorizedError_1.UnauthorizedError();
        }
        address.updatePartial({
            house_number: data.house_number,
            address: data.address,
            city: data.city,
            state: data.state,
            postcode: data.postcode,
        });
        return await this.addressRepository.update(address);
    }
}
exports.UpdateAddressUseCase = UpdateAddressUseCase;
