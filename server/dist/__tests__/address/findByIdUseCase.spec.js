"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Address_1 = require("../../domain/entities/Address");
const User_1 = require("../../domain/entities/User");
const NotFoundError_1 = require("../../application/erros/NotFoundError");
const FindAllAddressByUserIdUseCase_1 = require("../../application/useCases/address/FindAllAddressByUserIdUseCase");
describe("Create address Use Case", () => {
    let addresTest;
    let userTest;
    let mockRepository;
    let userRepo;
    let findAllAddress;
    const location = {
        latitude: 80,
        longitude: 80,
    };
    beforeEach(() => {
        userTest = new User_1.User((0, uuid_1.v4)(), "teste", "teste@teste123.com", "test123");
        const addresTest = [new Address_1.Address("uuid-1", "13", "teste endereço", "teste cidade", "estado teste", "03018000", location)];
        userRepo = {
            findById: jest.fn().mockResolvedValue(userTest),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByEmail: jest.fn(),
        };
        mockRepository = {
            create: jest.fn(),
            findAllByUserId: jest.fn().mockResolvedValue(addresTest),
            update: jest.fn(),
            findById: jest.fn()
        };
        findAllAddress = new FindAllAddressByUserIdUseCase_1.FindAllAddressByUserIdUseCase(mockRepository, userRepo);
    });
    it("should FindAll Address by user Id", async () => {
        const resultList = await findAllAddress.execute(userTest.id);
        expect(resultList.length).toBeGreaterThan(0);
        expect(resultList[0]).toBeInstanceOf(Address_1.Address);
        expect(resultList[0].getId()).toBe("uuid-1");
    });
    it("should not FindAll Address by user Id", async () => {
        userRepo.findById = jest.fn().mockResolvedValue(null);
        const notFound = new FindAllAddressByUserIdUseCase_1.FindAllAddressByUserIdUseCase(mockRepository, userRepo);
        await expect(notFound.execute("not found")).rejects.toBeInstanceOf(NotFoundError_1.NotFoundError);
    });
});
