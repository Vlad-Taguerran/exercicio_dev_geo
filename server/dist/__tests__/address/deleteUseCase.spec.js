"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = require("../../application/erros/NotFoundError");
const UnauthorizedError_1 = require("../../application/erros/UnauthorizedError");
const DeleteAddressUseCase_1 = require("../../application/useCases/address/DeleteAddressUseCase");
const Address_1 = require("../../domain/entities/Address");
const User_1 = require("../../domain/entities/User");
describe("Delete Address UseCase", () => {
    let addressRepo;
    let userRepo;
    let useCase;
    let user;
    let address;
    const userId = "user-123";
    const addressId = "address-456";
    const location = { latitude: 1, longitude: 1 };
    beforeEach(() => {
        user = new User_1.User(userId, "João", "joao@email.com", "123456");
        address = new Address_1.Address(addressId, "123", "Rua Exemplo", "Cidade Exemplo", "Estado", "00000-000", location, userId);
        addressRepo = {
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            findAllByUserId: jest.fn(),
            delete: jest.fn(), // se houver
        };
        userRepo = {
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByEmail: jest.fn(),
        };
        useCase = new DeleteAddressUseCase_1.DeleteAddressUseCase(addressRepo, userRepo);
    });
    it("should pass if address and user are valid and match", async () => {
        addressRepo.findById.mockResolvedValue(address);
        userRepo.findById.mockResolvedValue(user);
        await expect(useCase.execute(addressId, userId)).resolves.not.toThrow();
    });
    it("should throw NotFoundError if address does not exist", async () => {
        addressRepo.findById.mockResolvedValue(null);
        userRepo.findById.mockResolvedValue(user);
        await expect(useCase.execute(addressId, userId)).rejects.toThrow(NotFoundError_1.NotFoundError);
    });
    it("should throw NotFoundError if user does not exist", async () => {
        addressRepo.findById.mockResolvedValue(address);
        userRepo.findById.mockResolvedValue(null);
        await expect(useCase.execute(addressId, userId)).rejects.toThrow(NotFoundError_1.NotFoundError);
    });
    it("should throw UnauthorizedError if the address is not the user's", async () => {
        const enderecoDeOutro = new Address_1.Address(addressId, "123", "Outra Rua", "Outra Cidade", "Outro Estado", "11111-111", location, "outro-user-id");
        addressRepo.findById.mockResolvedValue(enderecoDeOutro);
        userRepo.findById.mockResolvedValue(user);
        await expect(useCase.execute(addressId, userId)).rejects.toThrow(UnauthorizedError_1.UnauthorizedError);
    });
});
