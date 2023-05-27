import { Show, Hall, Movie, AudioSystem, Cinema, Booking } from "../models/index.js";
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

export const getMaxSeats = async (showId) => {
  const show = await Show.findByPk(showId, {
    include: [
      {
        model: Hall,
        attributes: ["max_seats"],
      },
    ],
  });
  const maxSeats = show.Hall.max_seats;
  return maxSeats;
};

export const getBookedSeats = async (showId) => {
  const result = await Booking.findAll({
    attributes: ["seat"],
    where: {
      ShowId: showId,
    },
  });
  const bookedSeats = result.map((booking) => booking.dataValues.seat);
  return bookedSeats;
};
