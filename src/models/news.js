import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema({
  title: {
    type: String,
    required: [true, "News title is required"],
    minlength: [2, "News title must be at least 2 characters"],
    maxlength: [200, "News title can have at most 200 characters"],
    trim: true,
  },
  url: {
    type: String,
    required: [true, "News URL is required"],
    match: [/^https?:\/\/.+/, "Invalid URL format"],
  },
  publishedAt: { type: Date, default: Date.now },
  author: {
    type: String,
    required: [true, "News author is required"],
    minlength: [2, "News author must be at least 2 characters"],
    maxlength: [100, "News author can have at most 100 characters"],
    trim: true,
  },
  urlHash: {
    type: String,
    required: [true, "URL hash is required"],
    length: [32, "the hash would be of 32 chars"],
    trim: true,
  },
});

const News = mongoose.model("News", newsSchema);
export default News;
