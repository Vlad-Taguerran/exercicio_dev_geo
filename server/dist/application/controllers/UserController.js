"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserPostDto_1 = require("../dtos/User/UserPostDto");
const CreateUser_1 = require("../useCases/user/CreateUser");
const FindUserByEmail_1 = require("../useCases/user/FindUserByEmail");
const UserMapper_1 = require("../mappers/UserMapper");
const HttpErrorHandler_1 = require("../erros/HttpErrorHandler");
const FindUserByIdUseCase_1 = require("../useCases/user/FindUserByIdUseCase");
const UpdateUser_1 = require("../useCases/user/UpdateUser");
const UserUpdateDto_1 = require("../dtos/User/UserUpdateDto");
class UserController {
    constructor(userRepository, hashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.createUser = new CreateUser_1.CreateUser(this.userRepository);
        this.findUserByEmail = new FindUserByEmail_1.FindUserByEmail(this.userRepository);
        this.findUserById = new FindUserByIdUseCase_1.FindUserById(this.userRepository);
        this.updateUser = new UpdateUser_1.UpdateUser(this.userRepository, hashService);
    }
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            const userDto = new UserPostDto_1.UserPostDto(name, email, password);
            const user = await this.createUser.execute(userDto);
            return res.status(201).json(UserMapper_1.UserMappper.toGetDto(user));
        }
        catch (error) {
            return (0, HttpErrorHandler_1.handleHttpError)(error, res);
        }
    }
    async findByEmail(req, res) {
        try {
            const { email } = req.body;
            const user = await this.findUserByEmail.execute(email);
            return res.status(200).json(UserMapper_1.UserMappper.toGetDto(user));
        }
        catch (error) {
            return (0, HttpErrorHandler_1.handleHttpError)(error, res);
        }
    }
    async findById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.findUserById.execute(id);
            return res.status(200).json(UserMapper_1.UserMappper.toGetDto(user));
        }
        catch (error) {
            return (0, HttpErrorHandler_1.handleHttpError)(error, res);
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const dto = new UserUpdateDto_1.UserUpdateDto(id, name, email, password);
            const user = await this.updateUser.execute(dto);
            return res.status(200).json(UserMapper_1.UserMappper.toGetDto(user));
        }
        catch (error) {
            return (0, HttpErrorHandler_1.handleHttpError)(error, res);
        }
    }
}
exports.UserController = UserController;
