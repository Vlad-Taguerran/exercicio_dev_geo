"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const User_1 = require("../../../domain/entities/User");
const UpdateUser_1 = require("../../../application/useCases/user/UpdateUser");
describe("Update UseCase", () => {
    let userTest;
    let mockHashService;
    let mockRepository;
    let updateUser;
    beforeEach(() => {
        userTest = new User_1.User((0, uuid_1.v4)(), "teste", "teste@teste123.com", "test123");
        mockRepository = {
            create: jest.fn(),
            update: jest.fn().mockResolvedValue(userTest),
            findByEmail: jest.fn(),
            findById: jest.fn().mockResolvedValue(userTest),
            delete: jest.fn(),
        };
        mockHashService = {
            hash: jest.fn().mockImplementation(async (val) => `${val}`),
            compare: jest.fn(),
        };
        updateUser = new UpdateUser_1.UpdateUser(mockRepository, mockHashService);
    });
    it("Should update a user's name", async () => {
        const updateDto = { id: userTest.id, name: "novo nome" };
        const user = await updateUser.execute(updateDto);
        expect(user).toBeInstanceOf(User_1.User);
        expect(mockRepository.update).toHaveBeenCalledWith(expect.objectContaining({
            id: userTest.id,
            name: "novo nome"
        }));
        expect(user?.id).toBe(userTest.id);
    });
    it("Should update user's email only", async () => {
        const updateDto = { id: userTest.id, email: "new@email.com" };
        const user = await updateUser.execute(updateDto);
        expect(user).not.toBeNull();
        const notNullUser = user;
        expect(notNullUser.email).toBe("new@email.com");
        expect(mockRepository.update).toHaveBeenCalled();
    });
    it('Should not update user if not found by id', async () => {
        mockRepository.findById = jest.fn().mockResolvedValue(null);
        updateUser = new UpdateUser_1.UpdateUser(mockRepository, mockHashService);
        await expect(updateUser.execute({ id: userTest.id }))
            .rejects
            .toThrow("User not found");
    });
});
