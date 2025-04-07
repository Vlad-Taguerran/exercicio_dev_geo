"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Address_1 = require("../../domain/entities/Address");
const NotFoundError_1 = require("../../application/erros/NotFoundError");
const UpdateAddressUseCase_1 = require("../../application/useCases/address/UpdateAddressUseCase");
const UnauthorizedError_1 = require("../../application/erros/UnauthorizedError");
describe("UpdateAddressUseCase", () => {
    const mockAddressRepository = {
        findById: jest.fn(),
        update: jest.fn()
    };
    const mockUserRepository = {
        findById: jest.fn()
    };
    const useCase = new UpdateAddressUseCase_1.UpdateAddressUseCase(mockAddressRepository, mockUserRepository);
    const mockAddressEntity = new Address_1.Address("address-id", "123", "Rua 1", "Cidade", "Estado", "12345678", { latitude: 0, longitude: 0 }, "user-id");
    const mockUser = { id: "user-id" };
    const updateData = {
        id: "address-id",
        userId: "user-id",
        house_number: "456",
        address: "Rua 2",
        city: "Nova Cidade",
        state: "Novo Estado",
        postcode: "87654321"
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("deve atualizar o endereço com sucesso", async () => {
        mockAddressRepository.findById = jest.fn().mockResolvedValue(mockAddressEntity);
        mockUserRepository.findById = jest.fn().mockResolvedValue(mockUser);
        mockAddressRepository.update = jest.fn().mockResolvedValue(mockAddressEntity);
        const result = await useCase.execute(updateData);
        expect(mockAddressRepository.findById).toHaveBeenCalledWith("address-id");
        expect(mockUserRepository.findById).toHaveBeenCalledWith("user-id");
        expect(mockAddressRepository.update).toHaveBeenCalledWith(expect.any(Address_1.Address));
        expect(result).toBe(mockAddressEntity);
    });
    it("deve lançar erro se o endereço não for encontrado", async () => {
        mockAddressRepository.findById = jest.fn().mockResolvedValue(null);
        await expect(useCase.execute(updateData)).rejects.toThrow(NotFoundError_1.NotFoundError);
    });
    it("deve lançar erro se o usuário não for encontrado", async () => {
        mockAddressRepository.findById = jest.fn().mockResolvedValue(mockAddressEntity);
        mockUserRepository.findById = jest.fn().mockResolvedValue(null);
        await expect(useCase.execute(updateData)).rejects.toThrow(NotFoundError_1.NotFoundError);
    });
    it("deve lançar erro se o usuário não for dono do endereço", async () => {
        const addressDeOutroUsuario = new Address_1.Address("address-id", "123", "Rua 1", "Cidade", "Estado", "12345678", { latitude: 0, longitude: 0 }, "another-user-id" // ← userId diferente!
        );
        const anotherUser = { id: "user-id" };
        mockAddressRepository.findById = jest.fn().mockResolvedValue(addressDeOutroUsuario);
        mockUserRepository.findById = jest.fn().mockResolvedValue(anotherUser);
        await expect(useCase.execute(updateData)).rejects.toThrow(UnauthorizedError_1.UnauthorizedError);
    });
});
