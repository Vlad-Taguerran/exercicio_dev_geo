"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAddressUseCase = void 0;
const NotFoundError_1 = require("../../erros/NotFoundError");
class CreateAddressUseCase {
    constructor(addressRepository, userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }
    async execute(address) {
        const user = await this.userRepository.findById(address.getUserId());
        if (!user) {
            throw new NotFoundError_1.NotFoundError('User Not Found');
        }
        try {
            const savedAddress = await this.addressRepository.create(address);
            return savedAddress;
        }
        catch (error) {
            throw new Error("Server Error");
        }
    }
}
exports.CreateAddressUseCase = CreateAddressUseCase;
