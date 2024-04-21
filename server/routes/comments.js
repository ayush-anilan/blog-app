const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// POST create new comment
router.post("/:postId", commentController.createComment);

// PUT update comment
router.put("/:id", commentController.updateComment);

// DELETE delete comment
router.delete("/:id", commentController.deleteComment);

module.exports = router;
