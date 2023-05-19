/**
 * Auth middleware
 */
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    jwt.verify(token, process.env.API_SECRET, async (err, authData) => {
      if (err) {
        console.log("Error from auth middleware", err);
        res.sendStatus(403);
      } else {
        const user = await User.findById(authData.id);
        if (!user) {
          console.log("Error from auth middleware", err);
          res.sendStatus(403);
        } else {
          req.user = user;
          next();
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Please authenticate." });
  }
};
