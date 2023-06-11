import sequelize from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";
import { Movie } from "./index.js";

const Genre = sequelize.define("Genre", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.ENUM("Action", "Comedy", "Drama", "Thriller", "Sci-Fi"),
    allowNull: false,
    unique: true,
  },
});

export default Genre;
