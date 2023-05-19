import User from "../models/user.js";
/**
 * @desc get preferences for a user
 */
export const getPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(user.preferences);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while getting preferences",
    });
  }
};

/**
 * @desc Update preferences for a user
 */
export const updatePreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.preferences = req.body;
    try {
      await user.validate(); // check if the user document is valid
      await user.save(); // save the user document to the database
      res.send(user.preferences);
    } catch (err) {
      res.status(400).send(err);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while updating preferences",
    });
  }
};
