const Post = require("../models/Post.model");

async function createPost(req, res) {
  try {
    const post = new Post(req.body);
    const result = await post.save();
    console.log("🚀 ~ createPost ~ result:", result);
    res.status(201).send(result);
  } catch (err) {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
      status: "error",
      message: err.message,
      statusCode: statusCode, 
    });
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
      status: "error",
      message: err.message,
      statusCode: statusCode, 
    });
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("The post with the given ID was not found.");
    }
    res.send(post);
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      status: "error",
      message: err.message,
      statusCode: statusCode, 
    });
  }
}

async function updatePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!post) {
        return res.status(404).send("The post with the given ID was not found.");
      }
      res.send(post);
    } catch (err) {
      const statusCode = err.status || 500;
      res.status(statusCode).json({
        status: "error",
        message: err.message,
        statusCode: statusCode,
      });
    }
}

async function deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).send("The post with the given ID was not found.");
      }
      res.send(post);
    } catch (err) {
      const statusCode = err.status || 500;
      res.status(statusCode).json({
        status: "error",
        message: err.message,
        statusCode: statusCode,
      });
    }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
