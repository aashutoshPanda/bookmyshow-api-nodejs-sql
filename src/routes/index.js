import express from "express";
import authRouter from "./auth.js";
import showsRouter from "./shows.js";
import moviesRouter from "./movies.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/shows", isAuthenticated, showsRouter);
router.use("/api/movies", isAuthenticated, moviesRouter);

export default router;
