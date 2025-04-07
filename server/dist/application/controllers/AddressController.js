"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const CreateAddressUseCase_1 = require("../useCases/address/CreateAddressUseCase");
const AddressMapper_1 = require("../mappers/AddressMapper");
const FindAllAddressByUserIdUseCase_1 = require("../useCases/address/FindAllAddressByUserIdUseCase");
const Address_1 = require("../../domain/entities/Address");
const SSEController_1 = require("../../infrastructure/controller/SSEController");
const UpdateAddressUseCase_1 = require("../useCases/address/UpdateAddressUseCase");
const DeleteAddressUseCase_1 = require("../useCases/address/DeleteAddressUseCase");
const HttpErrorHandler_1 = require("../erros/HttpErrorHandler");
const logHelpers_1 = require("../../infrastructure/config/logHelpers");
class AddressController {
    constructor(addressRepository, userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.createAddresUseCase = new CreateAddressUseCase_1.CreateAddressUseCase(this.addressRepository, this.userRepository);
        this.findAllAddressByUserId = new FindAllAddressByUserIdUseCase_1.FindAllAddressByUserIdUseCase(this.addressRepository, this.userRepository);
        this.updateAddressUseCase = new UpdateAddressUseCase_1.UpdateAddressUseCase(addressRepository, userRepository);
        this.deleteAddressUseCase = new DeleteAddressUseCase_1.DeleteAddressUseCase(addressRepository, userRepository);
    }
    async create(req, res) {
        try {
            const { userId } = req.params;
            const { address, house_number, city, state, postcode, lat, long, notes } = req.body;
            const toSave = new Address_1.Address("", house_number, address, city, state, postcode, {
                latitude: parseFloat(lat),
                longitude: parseFloat(long)
            }, undefined, notes);
            toSave.assignToUser(userId);
            const saved = await this.createAddresUseCase.execute(toSave);
            SSEController_1.sseController.notify(AddressMapper_1.AddressMapper.toGetDto(saved));
            return res.status(201).send();
        }
        catch (error) {
            return (0, HttpErrorHandler_1.handleHttpError)(error, res);
        }
    }
    ;
    async findAllByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const addresList = await this.findAllAddressByUserId.execute(userId);
            const dtoList = AddressMapper_1.AddressMapper.toGetDtoList(addresList);
            return res.json(dtoList);
        }
        catch (error) {
            (0, logHelpers_1.logError)(`[ADDRESSCONTROLLER] `, error);
            return (0, HttpErrorHandler_1.handleHttpError)(error, res);
        }
    }
    ;
    async updateAddress(req, res) {
        const { addresId } = req.params;
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(404).json('User Not Found');
        }
        try {
            const dto = req.body;
            dto.id = addresId,
                dto.userId = userId;
            const address = await this.updateAddressUseCase.execute(dto);
            return res.json(AddressMapper_1.AddressMapper.toGetDto(address));
        }
        catch (error) {
            return (0, HttpErrorHandler_1.handleHttpError)(error, res);
        }
    }
    ;
    async deleteAddress(req, res) {
        const { addressId } = req.body;
        const userId = req.user?.userId;
        if (!userId) {
            return res.json;
        }
        if (!userId) {
            return res.status(404).json("User Not Found");
        }
        try {
            await this.deleteAddressUseCase.execute(addressId, userId);
            return res.status(204).send();
        }
        catch (error) {
            return (0, HttpErrorHandler_1.handleHttpError)(error, res);
        }
    }
}
exports.AddressController = AddressController;
