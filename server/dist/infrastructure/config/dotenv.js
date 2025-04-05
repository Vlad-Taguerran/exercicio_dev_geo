"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    dbHost: process.env.DB_HOST || "db",
    dbPort: Number(process.env.DB_PORT) || 3306,
    dbUser: process.env.DB_USER || "dev",
    dbPass: process.env.DB_PASS || "dev",
    dbName: process.env.DB_NAME || "dev_geo",
    jwtSecret: process.env.JWT_SECRET || "default-secret",
};
