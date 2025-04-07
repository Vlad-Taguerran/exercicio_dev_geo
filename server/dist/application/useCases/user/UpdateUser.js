"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const NotFoundError_1 = require("../../erros/NotFoundError");
class UpdateUser {
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }
    async execute(updateDto) {
        const user = await this.userRepository.findById(updateDto.id);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("User not found");
        }
        ;
        const updateData = {
            name: updateDto.name,
            email: updateDto.email,
        };
        if (updateDto.password) {
            updateData.password = await this.hashService.hash(updateDto.password);
        }
        user.updateProfile(updateData);
        const updatedUser = await this.userRepository.update(user);
        return updatedUser;
    }
}
exports.UpdateUser = UpdateUser;
