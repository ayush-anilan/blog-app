const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_thumbnails", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file types
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional resize
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, JPG, and PNG are allowed."),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 }, // 1MB file size limit
}).single("thumbnail");

// GET all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name profilePicture");
    const postsWithThumbnails = posts.map((post) => ({
      ...post.toObject(),
      idString: post._id.toString(),
    }));
    res.json(postsWithThumbnails);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts: " + err.message });
  }
};

// Get posts by user ID
exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ author: userId }).populate(
      "author",
      "name"
    );
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
};

// GET posts by author
exports.getPostsByAuthor = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.authorId });
    const postsWithThumbnails = posts.map((post) => ({
      ...post.toObject(),
      thumbnailUrl: post.getThumbnailUrl(),
    }));
    res.json(postsWithThumbnails);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching posts by author: " + err.message });
  }
};

// GET single post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name profilePicture"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      ...post.toObject(),
      thumbnailUrl: post.thumbnail, // Cloudinary URL instead of local file path
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching post: " + err.message });
  }
};

// POST create new post
exports.createPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(422)
        .json({ message: "File upload error: " + err.message });
    }

    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const post = new Post({
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
        author: req.params.userId,
        thumbnail: req.file ? req.file.path : null, // Cloudinary URL instead of local path
      });

      const newPost = await post.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json({ message: "Error creating post: " + err.message });
    }
  });
};

// PUT update post
exports.updatePost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(422)
        .json({ message: "File upload error: " + err.message });
    } else if (err) {
      return res.status(422).json({ message: err.message });
    }

    try {
      const { title, content } = req.body;
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const updatedData = {
        title: title || post.title,
        content: content || post.content,
        thumbnail: req.file ? req.file.path : post.thumbnail,
      };

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      console.error(err);
    }
  });
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
    res.status(500).json({ message: "Error deleting post: " + err.message });
  }
};
