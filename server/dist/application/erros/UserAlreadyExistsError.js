"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = void 0;
const ConflictError_1 = require("./ConflictError");
class UserAlreadyExistsError extends ConflictError_1.ConflictError {
    constructor(message = "User already exists") {
        super(message);
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
