import sequelize from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";

const AudioSystem = sequelize.define("AudioSystem", {
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
});

sequelize
  .sync()
  .then(() => {
    console.log("AudioSystem table created successfully!");
  })
  .catch((error) => {
    console.error("AudioSystem to create table : ", error);
  });

export default AudioSystem;
