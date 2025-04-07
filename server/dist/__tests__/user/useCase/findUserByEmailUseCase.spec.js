"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const FindUserByEmail_1 = require("../../../application/useCases/user/FindUserByEmail");
const User_1 = require("../../../domain/entities/User");
describe("FindUseCase", () => {
    let userTest;
    let mockRepository;
    let findUser;
    beforeEach(() => {
        userTest = new User_1.User((0, uuid_1.v4)(), "teste", "teste@teste123.com", "test123");
        mockRepository = {
            create: jest.fn(),
            update: jest.fn(),
            findByEmail: jest.fn().mockResolvedValue(userTest),
            findById: jest.fn(),
            delete: jest.fn(),
        };
        findUser = new FindUserByEmail_1.FindUserByEmail(mockRepository);
    });
    it('Should find User By Email', async () => {
        const user = await findUser.execute(userTest.email);
        expect(user).toBeInstanceOf(User_1.User);
        expect(user?.id).toBe(userTest.id);
    }),
        it('Should not find User By Email', async () => {
            mockRepository.findByEmail = jest.fn().mockResolvedValue(null);
            findUser = new FindUserByEmail_1.FindUserByEmail(mockRepository);
            await expect(findUser.execute("invalido@teste.com"))
                .rejects
                .toThrow("User not found");
        });
});
