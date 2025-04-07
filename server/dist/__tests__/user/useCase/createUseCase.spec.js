"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const UserAlreadyExistsError_1 = require("../../../application/erros/UserAlreadyExistsError");
const CreateUser_1 = require("../../../application/useCases/user/CreateUser");
const User_1 = require("../../../domain/entities/User");
describe("CreateUser Use Case", () => {
    let userTest;
    let mockRepository;
    let createUser;
    beforeEach(() => {
        userTest = new User_1.User((0, uuid_1.v4)(), "teste", "teste@teste123.com", "test123");
        mockRepository = {
            create: jest.fn().mockResolvedValue(userTest),
            findByEmail: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        createUser = new CreateUser_1.CreateUser(mockRepository);
    });
    it("should create a user successfully", async () => {
        const user = await createUser.execute(userTest);
        expect(user).toBeInstanceOf(User_1.User);
        expect(user.name).toBe(userTest.name);
        expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining(userTest));
    }),
        it("should fail to create a user same email", async () => {
            mockRepository.findByEmail = jest.fn().mockResolvedValue(userTest);
            createUser = new CreateUser_1.CreateUser(mockRepository);
            await expect(createUser.execute(userTest)).rejects.toBeInstanceOf(UserAlreadyExistsError_1.UserAlreadyExistsError);
            expect(mockRepository.create).not.toHaveBeenCalled();
        });
});
