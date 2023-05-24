import { getShowsByCinemaAndCity, getMaxSeats, getBookedSeats } from "../services/shows.js";
import { Booking, Show, Hall } from "../models/index.js";

/**
 * @desc GET shows by city and date
 */
export const getShowsByCinemaAndDate = async (req, res) => {
  try {
    const { cinemaId, date } = req.params;
    const shows = await getShowsByCinemaAndCity(cinemaId, date);
    return res.status(200).send({
      shows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while getting shows by city and date",
    });
  }
};

/**
 * @desc GET seats available for a show
 */
export const getSeats = async (req, res) => {
  try {
    const showId = req.params.id;
    const maxSeats = await getMaxSeats(showId);
    const bookedSeats = await getBookedSeats(showId);
    return res.status(200).send({
      bookedSeats,
      maxSeats,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while getting available seats for a show",
    });
  }
};

/**
 * @desc POST book seat for a show
 */
export const bookSeatForShow = async (req, res) => {
  try {
    console.log("IMPLEMENT");
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while booking a seat for the show",
    });
  }
};
