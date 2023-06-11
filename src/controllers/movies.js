import { Comment } from "../models/index.js";

/**
 * @desc GET shows by city and date
 */
export const getMovieById = async (req, res) => {
  try {
    res.json(req.movie);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while getting movies",
    });
  }
};

/**
 * @desc GET comments for a movie
 */
export const getCommentsForMovie = async (req, res) => {
  try {
    const { id } = req.params;

    // Find all comments with the specified movieSQLId
    const comments = await Comment.find({ movieSQLId: id });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving comments" });
  }
};

/**
 * @desc POST comments for a movie
 */
export const postCommentForMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Create a new comment instance
    const comment = new Comment({
      movieSQLId: id, // Replace with the actual movie SQL ID
      content: content,
      userSQLId: req.user.id,
    });

    // Save the comment to the database
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong while getting movies",
    });
  }
};
