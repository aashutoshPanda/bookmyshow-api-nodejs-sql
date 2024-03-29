import { Show, Hall, Movie, AudioSystem, Cinema, Booking } from "../models/index.js";
import axios from "axios";
import sequelize from "../helpers/sequelize.js";
import { axiosConfig } from "../configs/axios.js";

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

export const getBookedSeats = async (showId, transaction = undefined) => {
  const result = await Booking.findAll(
    {
      attributes: ["seat"],
      where: {
        ShowId: showId,
      },
    },
    {
      transaction,
    }
  );
  const bookedSeats = result.map((booking) => booking.dataValues.seat);
  return bookedSeats;
};

export const searchShowsFromElastic = async ({ language, dimension, genre, query }) => {
  const shouldConditions = [];
  if (language) {
    shouldConditions.push({ term: { "language.keyword": language } });
  }
  if (dimension) {
    shouldConditions.push({ term: { "dimension.keyword": dimension } });
  }

  if (genre) {
    shouldConditions.push({
      wildcard: {
        "genre.keyword": `*${genre}*`,
      },
    });
  }
  const requestBody = {
    query: {
      bool: {
        filter: [
          {
            bool: {
              should: shouldConditions,
              minimum_should_match: 0,
            },
          },
        ],
        should: [
          {
            multi_match: {
              query,
              fields: ["moviename", "hallname"],
              fuzziness: "AUTO",
            },
          },
        ],
        minimum_should_match: 0,
      },
    },
  };
  console.log(JSON.stringify(requestBody));
  const requestConfig = {
    ...axiosConfig,
    method: "get",
    data: JSON.stringify(requestBody),
  };

  const response = await axios(requestConfig);
  if (response.data.hits.total.value) {
    return response.data.hits.hits.map((res) => res._source);
  }
  return [];
};
