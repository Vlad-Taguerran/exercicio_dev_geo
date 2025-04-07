"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAddressUseCase = void 0;
const NotFoundError_1 = require("../../erros/NotFoundError");
const UnauthorizedError_1 = require("../../erros/UnauthorizedError");
class DeleteAddressUseCase {
    constructor(addressRespository, userRepository) {
        this.addressRespository = addressRespository;
        this.userRepository = userRepository;
    }
    async execute(addressId, userId) {
        const address = await this.addressRespository.findById(addressId);
        if (!address) {
            throw new NotFoundError_1.NotFoundError('Address Not Found');
        }
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError_1.NotFoundError('User Not Found');
        }
        if (user.id !== address.getUserId())
            throw new UnauthorizedError_1.UnauthorizedError();
    }
}
exports.DeleteAddressUseCase = DeleteAddressUseCase;
