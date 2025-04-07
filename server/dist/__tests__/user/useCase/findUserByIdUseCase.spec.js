"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const User_1 = require("../../../domain/entities/User");
const FindUserByIdUseCase_1 = require("../../../application/useCases/user/FindUserByIdUseCase");
describe("FindUseCase", () => {
    let userTest;
    let mockRepository;
    let findUser;
    beforeEach(() => {
        userTest = new User_1.User((0, uuid_1.v4)(), "teste", "teste@teste123.com", "test123");
        mockRepository = {
            create: jest.fn(),
            update: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn().mockResolvedValue(userTest),
            delete: jest.fn(),
        };
        findUser = new FindUserByIdUseCase_1.FindUserById(mockRepository);
    });
    it('Should find User By id', async () => {
        const user = await findUser.execute(userTest.id);
        expect(user).toBeInstanceOf(User_1.User);
        expect(user?.id).toBe(userTest.id);
    }),
        it('Should not find User By id', async () => {
            mockRepository.findById = jest.fn().mockResolvedValue(null);
            findUser = new FindUserByIdUseCase_1.FindUserById(mockRepository);
            await expect(findUser.execute((0, uuid_1.v4)()))
                .rejects
                .toThrow("User not found");
        });
});
