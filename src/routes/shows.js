import express from "express";
import { getSeats, getShowsByCinemaAndDate, bookSeatForShow } from "../controllers/shows.js";

const router = express.Router();

/**
 * @route   GET /api/shows/:city/:date
 * @desc    Get details of shows in a city
 * @access  Private
 */
router.get("/:cinemaId/:date", getShowsByCinemaAndDate);

/**
 * @route   GET /api/shows/:id
 * @desc    GET available seats for a show
 * @access  Private
 */
router.get("/:id", getSeats);

/**
 * @route   POST /api/shows/:id
 * @desc    Book seats for a particular show
 * @access  Private
 */
router.post("/:id", bookSeatForShow);

export default router;
