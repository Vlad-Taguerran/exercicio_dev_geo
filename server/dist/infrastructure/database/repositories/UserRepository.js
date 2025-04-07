"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const UserMapper_1 = require("../../../application/mappers/UserMapper");
const UserModel_1 = require("../models/UserModel");
class UserRepository {
    async findById(id) {
        const user = await UserModel_1.UserModel.findOne({ where: { id } });
        if (!user)
            return null;
        return await UserMapper_1.UserMappper.toEntityFromDb(user);
    }
    async findByEmail(email) {
        try {
            const model = await UserModel_1.UserModel.findOne({ where: { email } });
            if (!model)
                return null;
            return UserMapper_1.UserMappper.toEntityFromDb(model);
        }
        catch (error) {
            throw new Error("Erro ao buscar usuario");
        }
    }
    async create(dto) {
        const user = UserMapper_1.UserMappper.postToDomain(dto);
        try {
            const model = await UserModel_1.UserModel.create({ ...user });
            return UserMapper_1.UserMappper.toEntityFromDb(model);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async update(user) {
        const model = await UserModel_1.UserModel.findByPk(user.id);
        if (!model)
            return null;
        model.name = user.name;
        model.email = user.name;
        const updatedUser = await model.save();
        return UserMapper_1.UserMappper.toEntityFromDb(updatedUser);
    }
    async delete(id) {
        const deleted = await UserModel_1.UserModel.destroy({ where: { id: id } });
        return deleted > 0;
    }
}
exports.UserRepository = UserRepository;
