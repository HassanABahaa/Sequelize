import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

export const User = sequelize.define("user", {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  age: DataTypes.INTEGER,
});
