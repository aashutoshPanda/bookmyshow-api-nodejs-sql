import { sequelize } from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";

export const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Movie table created successfully!");
  })
  .catch((error) => {
    console.error("Movie to create table : ", error);
  });
