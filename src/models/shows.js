import { sequelize } from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";
import { Hall } from "./halls.js";
import { Movie } from "./movies.js";
import { AudioSystem } from "./audioSystems.js";

export const Show = sequelize.define("Show", {
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
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dimension: {
    type: DataTypes.ENUM("2D", "3D", "4D", "3D-IMAX", "4D-IMAX"),
    allowNull: false,
    unique: true,
    default: "2D",
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Show.belongsTo(Hall);
Hall.hasMany(Show);

Show.belongsTo(AudioSystem);
AudioSystem.hasMany(Show);

Show.belongsTo(Movie);
Movie.hasMany(Show);

sequelize
  .sync()
  .then(() => {
    console.log("Show table created successfully!");
  })
  .catch((error) => {
    console.error("Show to create table : ", error);
  });
