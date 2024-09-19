const Story = require("../models/Story.model");

async function createStory(req, res) {
  try {
    const story = new Story(req.body);
    const result = await story.save();
    console.log("🚀 ~ createStory ~ result:", result);
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

async function getAllStories(req, res) {
  try {
    const storys = await Story.find();
    res.send(storys);
  } catch (err) {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
      status: "error",
      message: err.message,
      statusCode: statusCode, 
    });
  }
}

async function getStoryById(req, res) {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).send("The story with the given ID was not found.");
    }
    res.send(story);
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      status: "error",
      message: err.message,
      statusCode: statusCode, 
    });
  }
}

async function updateStory(req, res) {
    try {
      const story = await Story.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!story) {
        return res.status(404).send("The story with the given ID was not found.");
      }
      res.send(story);
    } catch (err) {
      const statusCode = err.status || 500;
      res.status(statusCode).json({
        status: "error",
        message: err.message,
        statusCode: statusCode,
      });
    }
}

async function deleteStory(req, res) {
    try {
      const story = await Story.findByIdAndDelete(req.params.id);
      if (!story) {
        return res.status(404).send("The story with the given ID was not found.");
      }
      res.send(story);
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
  createStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
};
