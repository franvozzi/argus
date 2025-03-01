import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from './user';

class Execution extends Model {}

Execution.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        language: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.TEXT, allowNull: false },
        input: { type: DataTypes.TEXT },
        executionTime: { type: DataTypes.FLOAT },
        memoryUsage: { type: DataTypes.INTEGER },
        status: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: "Execution", tableName: "executions", timestamps: false }
);

User.hasMany(Execution, { foreignKey: "userId" });
Execution.belongsTo(User, { foreignKey: "userId" });

export default Execution;