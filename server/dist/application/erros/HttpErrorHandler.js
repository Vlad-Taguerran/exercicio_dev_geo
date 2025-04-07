"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttpError = handleHttpError;
const sequelize_1 = require("sequelize");
const NotFoundError_1 = require("./NotFoundError");
const UnauthorizedError_1 = require("./UnauthorizedError");
const InfrastructureError_1 = require("./InfrastructureError");
function handleHttpError(error, res) {
    if (error instanceof NotFoundError_1.NotFoundError) {
        return res.status(404).json({ error: error.message });
    }
    if (error instanceof UnauthorizedError_1.UnauthorizedError) {
        return res.status(403).json({ error: error.message });
    }
    if (error instanceof sequelize_1.ValidationError) {
        return res.status(400).json({ error: error.message });
    }
    if (error instanceof InfrastructureError_1.InfrastructureError) {
        return res.status(500).json({ error: "Erro no servidor" });
    }
    return res.status(500).json({ error: "Erro no servidor" });
}
