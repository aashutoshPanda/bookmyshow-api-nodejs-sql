/**
 * Middleware Validators
 */
import { Movie, Genre, Cast } from "../models/index.js";
import { getMovieById } from "../services/movies.js";

export async function validateMovieId(req, res, next) {
  const { id } = req.params;

  try {
    const movie = await getMovieById(id);
    if (movie) {
      // Movie with the given id exists
      req.movie = movie;
      next();
    } else {
      // Movie with the given id does not exist
      res.status(404).json({ error: "Invalid MovieId" });
    }
  } catch (error) {
    console.log(error);
    // Error occurred while querying the database
    res.status(500).json({ error });
  }
}
