"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)(); // Carregar variáveis do .env
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    retry: { max: 10 },
    logging: console.log,
    models: [path_1.default.join(__dirname, './models')], // Caminho dos modelos
});
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("✅ Conectado ao banco de dados!");
        await exports.sequelize.sync({ alter: true }); // 🔹 Atualiza as tabelas automaticamente
        console.log("📦 Banco de dados atualizado!");
    }
    catch (error) {
        console.error("❌ Erro ao conectar no banco:", error);
    }
};
exports.connectDB = connectDB;
