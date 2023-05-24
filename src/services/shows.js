import { Show, Hall, Movie, AudioSystem, Cinema } from "../models/index.js";
import sequelize from "../helpers/sequelize.js";

export const getShowsByCinemaAndCity = async (cinemaId, date) => {
  const shows = await Show.findAll({
    attributes: ["id", "dimension", "startTime", "language"],
    include: [
      {
        model: Hall,
        required: true,
        attributes: ["name"],
        include: [
          {
            model: Cinema,
            attributes: ["name"],
            where: {
              id: parseInt(cinemaId),
            },
          },
        ],
      },
      {
        model: Movie,
        required: true,
        attributes: ["name"],
      },
      {
        model: AudioSystem,
        required: true,
        attributes: ["name"],
      },
    ],
    where: sequelize.where(sequelize.fn("date", sequelize.col("startTime")), "=", date),
  });
  return shows;
};
