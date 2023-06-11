import sequelize from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";
import { Movie } from "./index.js";

const Cast = sequelize.define("Cast", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Name is required.",
      },
      notEmpty: {
        msg: "Name cannot be empty.",
      },
      len: {
        args: [2, 255],
        msg: "Name must be between 2 and 255 characters long.",
      },
    },
  },
});

export default Cast;
