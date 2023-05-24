import { User } from "../models.js";

/**
 * @desc POST Signup for a user
 */
export const login = async (req, res) => {
  try {
    console.log("IMPLEMENT");
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while login",
    });
  }
};

/**
 * @desc POST Login for a user
 */
export const signup = async (req, res) => {
  try {
    console.log("IMPLEMENT");
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while signup",
    });
  }
};
