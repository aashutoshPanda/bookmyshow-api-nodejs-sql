import sequelize from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";
import Show from "./shows.js";
import User from "./users.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  seat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

Booking.belongsTo(Show);
Show.hasMany(Booking);

Booking.belongsTo(User);
User.hasMany(Booking);

sequelize
  .sync()
  .then(() => {
    console.log("Booking table created successfully!");
  })
  .catch((error) => {
    console.error("Booking to create table : ", error);
  });

export default Booking;
