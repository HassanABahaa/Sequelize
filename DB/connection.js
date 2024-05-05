import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("sequelize", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
export const syncTables = async () => {
  return await sequelize.sync(); // to create models in DB if not exists
};
