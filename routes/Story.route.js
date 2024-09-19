const express = require("express");
const router = express.Router();
const {
  createStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
} = require("../controllers/Story.controller");

router.post("/", createStory);
router.get("/", getAllStories);
router.get("/:id", getStoryById);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);

module.exports = router;
