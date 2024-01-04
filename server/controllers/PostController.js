const Post = require("../models/PostModel");

module.exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.createPost = async (req, res, next) => {
  try {
    const { userId, prompt } = req.body;
    if (!userId) {
      return res.json({ message: "User ID is required." });
    }
    if (!prompt) {
      return res.json({ message: "Prompt is required." });
    }
    const post = await Post.create({ userId, prompt });
    res
      .status(201)
      .json({
        message: "Post created successfully.",
        success: true,
        post: post,
      });
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
