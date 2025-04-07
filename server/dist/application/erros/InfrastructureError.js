"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureError = void 0;
class InfrastructureError extends Error {
    constructor(message, originalError) {
        super(message);
        this.originalError = originalError;
        this.name = 'InfrastructureError';
    }
}
exports.InfrastructureError = InfrastructureError;
