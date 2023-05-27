import { getShowsByCinemaAndCity, getMaxSeats, getBookedSeats } from "../services/shows.js";
import sequelize from "../helpers/sequelize.js";
import { Booking } from "../models/index.js";

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
    const seatsToBook = req.body.seats;
    const showId = req.params.id;
    await sequelize.transaction(async (transaction) => {
      const bookedSeats = await getBookedSeats(showId);
      const seatsWhichCantBeBooked = seatsToBook.filter((value) => bookedSeats.includes(value));
      if (seatsWhichCantBeBooked.length) {
        return res.status(400).send({ message: "These seats are already booked", seatsWhichCantBeBooked });
      }

      // DO BULK BOOKING
      const bookingsData = seatsToBook.map((seat) => ({ ShowId: showId, UserId: req.user.dataValues.id, seat }));
      const bookingsMade = await Booking.bulkCreate(bookingsData);
      return res.status(200).send({ bookingsMade });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while booking a seat for the show",
    });
  }
};
