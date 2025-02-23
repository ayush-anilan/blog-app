const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// POST create new comment
router.post("/:postId", commentController.createComment);

// GET Fetch comments for a specified post
router.get("/:postId", commentController.getCommentsByPost);

// PUT update comment
router.put("/:id", commentController.updateComment);

// DELETE delete comment
router.delete("/:id", commentController.deleteComment);

module.exports = router;
