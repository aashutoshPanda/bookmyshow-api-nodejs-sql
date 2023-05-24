import dotenv from "dotenv";
dotenv.config({ path: ".env.example" });
import express from "express";
import routes from "./src/routes/index.js";

// Make all variables from our .env file available in our process

// Init express server
const app = express();

//rate limit

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Here we define the api routes
app.use(routes);

const port = process.env.PORT || 8080;
const address = process.env.SERVER_ADDRESS || "localhost";

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Server running on http://${address}:${port}`));

export default app;
