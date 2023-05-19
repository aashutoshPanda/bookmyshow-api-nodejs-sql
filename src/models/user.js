import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    minlength: [2, "Full name must be at least 2 characters"],
    maxlength: [100, "Full name can have at most 100 characters"],
    trim: true,
    validate: {
      validator: function (value) {
        // Define your custom validation logic here
        // Return true if value is valid, otherwise return false
        const fullNameRegex = /^[A-Za-z]+([\s]?[A-Za-z]+)*$/;
        return fullNameRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid full name!`,
    },
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    maxlength: [100, "Password can have at most 100 characters"],
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "News" }],
  read: [{ type: mongoose.Schema.Types.ObjectId, ref: "News" }],
  preferences: {
    type: [
      {
        type: String,
        maxlength: 20,
      },
    ],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.every((val) => typeof val === "string");
      },
      message: "Preferences should be an array of strings",
    },
  },
});

const User = mongoose.model("User", userSchema);
export default User;
