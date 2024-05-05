import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./user.model.js";

export const Post = sequelize.define("post", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
});

// one-to-many relation
User.hasMany(Post);
Post.belongsTo(User);
