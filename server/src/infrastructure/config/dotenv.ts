import dotenv from "dotenv";

dotenv.config();

export const env = {
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbUser: process.env.DB_USER || "dev",
  dbPass: process.env.DB_PASS || "dev",
  dbName: process.env.DB_NAME || "dev_geo",
  jwtSecret: process.env.JWT_SECRET || "default-secret",
};
