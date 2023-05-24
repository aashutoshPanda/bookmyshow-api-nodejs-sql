import { sequelize } from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";
import { Show } from "./shows.js";
import { User } from "./users.js";

export const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  seat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Booking.belongsTo(Show);
Show.hasMany(Booking);

Booking.belongsTo(User);
User.hasMany(Booking);

Show.belongsTo(Movie);
Movie.hasMany(Show);

sequelize
  .sync()
  .then(() => {
    console.log("Booking table created successfully!");
  })
  .catch((error) => {
    console.error("Booking to create table : ", error);
  });
