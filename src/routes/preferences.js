import express from "express";
import { getPreferences, updatePreferences } from "../controllers/preferences.js";
const router = express.Router();

/**
 * @route   GET /preferences
 * @desc    Get the preferences of the logged in user
 * @access  Private
 */
router.get("", getPreferences);

/**
 * @route   PUT /preferences
 * @desc    Update the preferences of the logged in user
 * @access  Private
 */
router.put("", updatePreferences);

export default router;
