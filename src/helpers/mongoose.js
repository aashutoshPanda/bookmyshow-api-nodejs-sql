import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // MongoDB setup.
    const connectionURI = process.env.NODE_ENV === "TEST" ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI;
    console.log("connected to ", connectionURI);
    await mongoose.connect(connectionURI);
  } catch ({ message }) {
    console.error("Error with mongo setup", message);
    console.log("%s MongoDB connection error. Please make sure MongoDB is running.");
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
