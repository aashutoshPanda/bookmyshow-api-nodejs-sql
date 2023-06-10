import express from "express";
import { getMovieById } from "../controllers/movies.js";
import { validateMovieId } from "../middlewares/validators.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

/**
 * @route   GET /api/movies/:id
 * @desc    Get details of movies
 * @access  Private
 */
router.get("/:id", asyncHandler(validateMovieId), getMovieById);

export default router;
