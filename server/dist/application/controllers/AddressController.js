"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const AddressRepository_1 = require("../../infrastructure/database/repositories/AddressRepository");
const CreateAddressUseCase_1 = require("../useCases/address/CreateAddressUseCase");
const UserRepository_1 = require("../../infrastructure/database/repositories/UserRepository");
const AddressPostDto_1 = require("../dtos/address/AddressPostDto");
class AddressController {
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
        this.addressRepository = new AddressRepository_1.AddressRepository();
        this.createAddresUseCase = new CreateAddressUseCase_1.CreateAddressUseCase(this.addressRepository, this.userRepository);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { address, house_number, city, state, postcode, long, lat } = req.body;
                const dto = new AddressPostDto_1.AddressPostDto(address, house_number, city, state, postcode, long, lat);
                yield this.createAddresUseCase.execute(dto, userId);
                return res.status(201).send();
            }
            catch (error) {
                return res.status(500).json({ error: "Erro ao processar CSV" });
            }
        });
    }
}
exports.AddressController = AddressController;
