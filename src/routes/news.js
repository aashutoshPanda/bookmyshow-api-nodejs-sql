import express from "express";
import {
  markNewsAsRead,
  markNewsAsFavourite,
  getReadNews,
  getFavouriteNews,
  getNewsByKeyword,
  getNewsByUserPreferences,
} from "../controllers/news.js";

const router = express.Router();
/**
 * @route   POST /news/:id/read
 * @desc    Mark a news article as READ for a user
 * @access  Private
 */
router.post("/:id/read", markNewsAsRead);

/**
 * @route   POST /news/:id/favourite
 * @desc    Mark a news article as FAVOURITE for a user
 * @access  Private
 */
router.post("/:id/favourite", markNewsAsFavourite);

/**
 * @route   GET /news/read
 * @desc    Get all the read news for the user
 * @access  Private
 */
router.get("/read", getReadNews);

/**
 * @route   GET /news/favourite
 * @desc    Get all the favaurite news of the logged in user
 * @access  Private
 */
router.get("/favourite", getFavouriteNews);

/**
 * @route   POST /search/:keyword
 * @desc    Search news by keyword
 * @access  Private
 */
router.get("/search/:keyword", getNewsByKeyword);

/**
 * @route   GET /news
 * @desc    Get news as per the preferences saved by the logged in user
 * @access  Private
 */
router.get("", getNewsByUserPreferences);

export default router;
