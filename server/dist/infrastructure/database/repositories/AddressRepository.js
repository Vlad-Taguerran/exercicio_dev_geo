"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepository = void 0;
const AddressModel_1 = require("../models/AddressModel");
const sequelize_1 = require("../sequelize");
const AddressMapper_1 = require("../../../application/mappers/AddressMapper");
const logHelpers_1 = require("../../config/logHelpers");
const NotFoundError_1 = require("../../../application/erros/NotFoundError");
class AddressRepository {
    async create(address) {
        const transaction = await sequelize_1.sequelize.transaction();
        try {
            const created = await AddressModel_1.AddressModel.create({
                address: address.getAddress(),
                house_number: address.getHouseNumber(),
                city: address.getCity(),
                state: address.getState(),
                postcode: address.getPostcode(),
                location: {
                    type: 'Point',
                    coordinates: [
                        parseFloat(address.getLocation().longitude.toString()),
                        parseFloat(address.getLocation().latitude.toString())
                    ],
                },
                userId: address.getUserId(),
                notes: address.getNotes()
            }, { transaction });
            await transaction.commit();
            return AddressMapper_1.AddressMapper.toDomain(created);
        }
        catch (error) {
            await transaction.rollback();
            (0, logHelpers_1.logError)('Erro no AddressRepository.create', error);
            throw new Error(`Erro ao criar endereço: ${error}`);
        }
    }
    async findAllByUserId(userId) {
        try {
            const addressModel = await AddressModel_1.AddressModel.findAll({ where: { 'userId': userId } });
            const addresses = addressModel.map((model) => AddressMapper_1.AddressMapper.toDomain(model));
            return addresses;
        }
        catch (error) {
            throw new Error(`Erro ao buscar endereçços`);
        }
    }
    async update(toUpdate) {
        const addressModel = await AddressModel_1.AddressModel.findByPk(toUpdate.getId());
        if (!addressModel)
            throw new NotFoundError_1.NotFoundError("Address not found");
        addressModel.notes = toUpdate.getNotes();
        addressModel.save();
        return AddressMapper_1.AddressMapper.toDomain(addressModel);
    }
    async findById(addressId) {
        const adddressModel = await AddressModel_1.AddressModel.findByPk(addressId);
        if (!adddressModel) {
            return null;
        }
        return AddressMapper_1.AddressMapper.toDomain(adddressModel);
    }
}
exports.AddressRepository = AddressRepository;
