import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.API_SECRET, { expiresIn: 86400 });
  return token;
};

export const createNewUser = async ({ fullName, email, role, password }) => {
  const user = new User({
    fullName,
    email,
    role,
    password: bcrypt.hashSync(password, 8),
  });

  await user.save(); // save the user document to the database
  return user;
};

export const deleteAllUsers = async () => {
  try {
    await User.deleteMany({});
  } catch (err) {
    console.log("Could not delete all the users", err);
  }
};
