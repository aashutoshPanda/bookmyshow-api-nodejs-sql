import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  movieSQLId: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return Number.isInteger(value) && value > 0;
      },
      message: "movieSQLId must be a positive integer",
    },
  },
  userSQLId: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return Number.isInteger(value) && value > 0;
      },
      message: "userSQLId must be a positive integer",
    },
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500, // Maximum length of 500 characters
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Referring to the same schema for child comments
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
