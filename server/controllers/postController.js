const Post = require("../models/Post");
const User = require("../models/User");

// GET all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create new post
exports.createPost = async (req, res) => {
  try {
    // Find the user who is creating the post
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.params.userId.toString(), // Assign the user's ObjectId as the post's author
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.title = req.body.title;
    post.content = req.body.content;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
