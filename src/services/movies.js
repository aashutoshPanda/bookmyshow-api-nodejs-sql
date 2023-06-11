/**
 * Middleware Validators
 */
import { Movie, Cast, Genre } from "../models/index.js";
import { setValueCache, getValueCache } from "./cache.js";

export const getMovieById = async (id) => {
  try {
    const cacheValue = await getValueCache(`movie-${id}`);
    if (cacheValue !== null) {
      return cacheValue;
    }
    const movie = await Movie.findByPk(id, {
      include: [
        {
          model: Cast,
          as: "cast",
          attributes: ["name"],
          through: { attributes: [] }, // Exclude intermediate table properties
        },
        {
          model: Genre,
          as: "genres",
          attributes: ["name"],
          through: { attributes: [] }, // Exclude intermediate table properties
        },
      ],
    });
    await setValueCache(`movie-${id}`, movie);
    return movie;
  } catch (error) {
    console.error(`Error getting value for key ${id}: ${error}`);
    return null;
  }
};
