"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllAddressByUserIdUseCase = void 0;
const NotFoundError_1 = require("../../erros/NotFoundError");
class FindAllAddressByUserIdUseCase {
    constructor(addressRepository, userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }
    async execute(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user)
            throw new NotFoundError_1.NotFoundError("User Not Found");
        try {
            return await this.addressRepository.findAllByUserId(userId);
        }
        catch (error) {
            console.log(error);
            throw new Error("Error ao persistir Adress");
        }
    }
}
exports.FindAllAddressByUserIdUseCase = FindAllAddressByUserIdUseCase;
