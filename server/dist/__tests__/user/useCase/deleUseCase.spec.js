"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const User_1 = require("../../../domain/entities/User");
const DeleteUseCase_1 = require("../../../application/useCases/user/DeleteUseCase");
const NotFoundError_1 = require("../../../application/erros/NotFoundError");
describe("Delet UseCase", () => {
    let userTest;
    let mockRepository;
    let deleteUser;
    beforeEach(() => {
        userTest = new User_1.User((0, uuid_1.v4)(), "teste", "teste@teste123.com", "test123");
        mockRepository = {
            create: jest.fn(),
            update: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn().mockResolvedValue(userTest),
            delete: jest.fn().mockResolvedValue(true),
        };
        deleteUser = new DeleteUseCase_1.DeleteUseCase(mockRepository);
    });
    it("Should Delete a user", async () => {
        const user = await deleteUser.execute(userTest.id);
        expect(user).toBeUndefined();
        expect(mockRepository.delete).toHaveBeenCalledWith(userTest.id);
    }),
        it('Should not delete user if not found by id', async () => {
            mockRepository.delete = jest.fn().mockResolvedValue(false);
            const deleteUseCase = new DeleteUseCase_1.DeleteUseCase(mockRepository);
            await expect(deleteUseCase.execute((0, uuid_1.v4)()))
                .rejects
                .toBeInstanceOf(NotFoundError_1.NotFoundError);
        });
});
