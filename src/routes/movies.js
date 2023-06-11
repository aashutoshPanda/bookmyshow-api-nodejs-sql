import express from "express";
import { getMovieById, getCommentsForMovie, postCommentForMovie } from "../controllers/movies.js";
import { validateMovieId } from "../middlewares/validators.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

/**
 * @route   GET /api/movies/:id
 * @desc    Get details of movies
 * @access  Private
 */
router.get("/:id", asyncHandler(validateMovieId), getMovieById);

/**
 * @route   GET /api/movies/comments/:id
 * @desc    Get comments for a movie
 * @access  Private
 */
router.get("/comments/:id", asyncHandler(validateMovieId), getCommentsForMovie);

/**
 * @route   POST /api/movies/comments/:id
 * @desc    Post comment for a movie
 * @access  Private
 */
router.post("/comments/:id", asyncHandler(validateMovieId), postCommentForMovie);
export default router;
