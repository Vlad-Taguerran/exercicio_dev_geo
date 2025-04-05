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
exports.CreateAddressUseCase = void 0;
const SSEController_1 = require("../../../infrastructure/controller/SSEController");
const AddressMapper_1 = require("../../mappers/AddressMapper");
class CreateAddressUseCase {
    constructor(addressRepository, userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }
    execute(address, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(userId);
                if (!user) {
                    throw new Error("Usuario não encontrado");
                }
                const savadeAddress = yield this.addressRepository.create(address, user);
                const responseDto = AddressMapper_1.AddressMapper.toGetDto(savadeAddress);
                SSEController_1.sseController.notify(responseDto);
            }
            catch (error) {
                throw new Error("Error ao persistir Adress");
            }
        });
    }
}
exports.CreateAddressUseCase = CreateAddressUseCase;
