import sequelize from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";
import Hall from "./halls.js";
import Movie from "./movies.js";
import AudioSystem from "./audioSystems.js";

const Show = sequelize.define("Show", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dimension: {
    type: DataTypes.ENUM("2D", "3D", "4D", "3D-IMAX", "4D-IMAX"),
    allowNull: false,
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

export default Show;
