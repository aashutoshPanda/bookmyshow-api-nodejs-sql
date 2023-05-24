/**
 * @desc GET shows by city and date
 */
export const getShowsByCityAndDate = async (req, res) => {
  try {
    console.log("IMPLEMENT");
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while getting shows by city and date",
    });
  }
};

/**
 * @desc GET seats available for a show
 */
export const getSeats = async (req, res) => {
  try {
    console.log("IMPLEMENT");
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while getting available seats for a show",
    });
  }
};

/**
 * @desc POST book seat for a show
 */
export const bookSeatForShow = async (req, res) => {
  try {
    console.log("IMPLEMENT");
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while booking a seat for the show",
    });
  }
};
