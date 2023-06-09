import sequelize from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";

const Cinema = sequelize.define("Cinema", {
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
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Cinema table created successfully!");
  })
  .catch((error) => {
    console.error("Cinema to create table : ", error);
  });

export default Cinema;
