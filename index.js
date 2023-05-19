import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import connectDB from "./src/helpers/mongoose.js";
import routes from "./src/routes/index.js";
import rateLimit from "express-rate-limit";
import loggerMiddleware from "./src/middlewares/logger.js";

// Make all variables from our .env file available in our process
dotenv.config({ path: ".env.example" });

// Init express server
const app = express();

// Connect to MongoDB.
await connectDB();

//rate limit

const limiter = rateLimit({
  windowMs: 10 * 1000,
  max: 3,
  message: "Too many requests from this IP, please try again later.",
});
if (process.env.NODE_ENV !== "TEST") {
  app.use(limiter);
}
app.use(loggerMiddleware());
// Middlewares & configs setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Here we define the api routes
app.use(routes);

const port = process.env.PORT || 8080;
const address = process.env.SERVER_ADDRESS || "localhost";

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Server running on http://${address}:${port}`));

export default app;
