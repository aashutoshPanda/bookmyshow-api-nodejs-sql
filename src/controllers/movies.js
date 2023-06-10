import sequelize from "../helpers/sequelize.js";
import { Movie } from "../models/index.js";

/**
 * @desc GET shows by city and date
 */
export const getMovieById = async (req, res) => {
  try {
    res.json(req.movie);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while getting movies",
    });
  }
};
