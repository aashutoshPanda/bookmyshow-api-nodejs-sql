import express from "express";
import authRouter from "./auth.js";
import preferencesRouter from "./preferences.js";
import newsRouter from "./news.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/preferences", isAuthenticated, preferencesRouter);
router.use("/news", isAuthenticated, newsRouter);

export default router;
