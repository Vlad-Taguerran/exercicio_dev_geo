import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import path from 'path';

config(); // Carregar variáveis do .env

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  retry:{max:10},
  logging: console.log,
  models: [path.join(__dirname, './models')], // Caminho dos modelos
});
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao banco de dados!");

    await sequelize.sync({ alter: true }); // 🔹 Atualiza as tabelas automaticamente
    console.log("📦 Banco de dados atualizado!");
  } catch (error) {
    console.error("❌ Erro ao conectar no banco:", error);
  }
};