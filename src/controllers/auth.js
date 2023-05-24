import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/**
 * @desc POST login for a user
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });
    return res.status(200).send({
      id: user.id,
      username,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while login",
    });
  }
};

/**
 * @desc POST register for a user
 */
export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const { username, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, salt);
    const created_user = await User.create({ username, password: encryptedPassword });
    res.status(201).json(created_user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while signup",
    });
  }
};
