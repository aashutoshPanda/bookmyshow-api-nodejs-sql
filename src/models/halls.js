import { sequelize } from "../helpers/sequelize.js";
import { DataTypes } from "sequelize";
import { Cinema } from "./cinemas.js";
export const Hall = sequelize.define("Hall", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  max_seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
// Define the foreign key relationship

Hall.belongsTo(Cinema); // Each post belongs to a user
Cinema.hasMany(Hall); // Each user can have multiple posts
sequelize
  .sync()
  .then(() => {
    console.log("Hall table created successfully!");
  })
  .catch((error) => {
    console.error("Hall to create table : ", error);
  });
