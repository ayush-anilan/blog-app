const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.getAllPosts);

// GET single post
router.get("/:id", postController.getPostById);

router.get("/user/:userId", postController.getUserPosts);

router.get("/author/:authorId", postController.getPostsByAuthor);

// POST create new post
router.post("/:userId/create", postController.createPost);

// PUT update post
router.put("/:id/update", postController.updatePost);

// DELETE delete post
router.delete("/:id", postController.deletePost);

module.exports = router;
