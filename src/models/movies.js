import sequelize from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";
import Cast from "./casts.js";
import Genre from "./genres.js";

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Name is required.",
      },
      notEmpty: {
        msg: "Name cannot be empty.",
      },
    },
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Duration is required.",
      },
      min: {
        args: [1],
        msg: "Duration must be a positive integer.",
      },
    },
  },
  moviePlot: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Movie plot is required.",
      },
      notEmpty: {
        msg: "Movie plot cannot be empty.",
      },
    },
  },
});
// Define the join table
const GenreMovie = sequelize.define("GenreMovie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
// Define the join table
export const CastMovie = sequelize.define("CastMovie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
Movie.belongsToMany(Cast, { through: CastMovie, as: "cast" });
Movie.belongsToMany(Genre, { through: GenreMovie, as: "genres" });

sequelize
  .sync()
  .then(() => {
    console.log("Movie table created successfully!");
  })
  .catch((error) => {
    console.error("Failed to create Movie table:", error);
  });

export default Movie;
