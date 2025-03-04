import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

// Define the User class first
class User extends Model {}

// Then initialize it
User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
        password: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: 'User', tableName: 'users', timestamps: false }
);

export default User;