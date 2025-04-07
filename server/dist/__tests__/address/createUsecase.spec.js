"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Address_1 = require("../../domain/entities/Address");
const CreateAddressUseCase_1 = require("../../application/useCases/address/CreateAddressUseCase");
const User_1 = require("../../domain/entities/User");
const NotFoundError_1 = require("../../application/erros/NotFoundError");
describe("Create address Use Case", () => {
    let addresTest;
    let userTest;
    let mockRepository;
    let userRepo;
    let createAddress;
    const location = {
        latitude: 80,
        longitude: 80,
    };
    beforeEach(() => {
        userTest = new User_1.User((0, uuid_1.v4)(), "teste", "teste@teste123.com", "test123");
        addresTest = new Address_1.Address((0, uuid_1.v4)(), "13", "teste endereço", "teste cidade", "estado teste", "03018000", location);
        userRepo = {
            findById: jest.fn().mockResolvedValue(userTest),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByEmail: jest.fn(),
        };
        mockRepository = {
            create: jest.fn().mockResolvedValue(addresTest),
            findAllByUserId: jest.fn(),
            findById: jest.fn(),
            update: jest.fn()
        };
        createAddress = new CreateAddressUseCase_1.CreateAddressUseCase(mockRepository, userRepo);
    });
    it("should create a address successfully", async () => {
        addresTest.assignToUser(userTest.id);
        const address = await createAddress.execute(addresTest);
        expect(address).toBeInstanceOf(Address_1.Address);
        expect(address.getId()).toBe(addresTest.getId());
        expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            id: addresTest.getId(),
            userId: userTest.id,
        }));
    });
    it("should fail to create a address not found user", async () => {
        userRepo.findById.mockResolvedValue(null);
        await expect(createAddress.execute(addresTest))
            .rejects.toBeInstanceOf(NotFoundError_1.NotFoundError);
        expect(mockRepository.create).not.toHaveBeenCalled();
    });
});
