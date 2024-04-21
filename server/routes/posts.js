const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.getAllPosts);

// GET single post
router.get("/:id", postController.getPostById);

// POST create new post
router.post("/:userId", postController.createPost);

// PUT update post
router.put("/:id", postController.updatePost);

// DELETE delete post
router.delete("/:id", postController.deletePost);

module.exports = router;
