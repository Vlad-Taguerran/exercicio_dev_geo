"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../../application/erros/AppError");
const logHelpers_1 = require("../config/logHelpers");
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    (0, logHelpers_1.logError)("Unexpected Error:", err);
    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
