import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL || "postgres://postgres:password@localhost:5432/argus", {
  dialect: "postgres",
  logging: console.log, // Cambiar a false en producción
});

export default sequelize;
