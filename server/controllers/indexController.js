const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pictures",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage }).single("profilePicture");

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const passOK = bcrypt.compareSync(password, user.password);
    if (passOK) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        process.env.SECRET_KEY,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            message: "Login successful",
            token,
            user: {
              id: user._id,
              name: user.name,
              profilePicture: user.profilePicture, // Cloudinary URL
            },
          });
        }
      );
    } else {
      res.status(422).json("Invalid password");
    }
  } else {
    res.status(404).json("User not found");
  }
};

exports.register = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(422).json({ message: "Error uploading file." });
    }

    const { name, email, password } = req.body;
    let profilePicture = null;

    if (req.file) {
      profilePicture = req.file.path; // Cloudinary URL
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const userDoc = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        profilePicture: profilePicture, // Cloudinary URL stored
      });

      res.json(userDoc);
    } catch (err) {
      if (err.code === 11000 && err.keyValue.email) {
        return res.status(422).json({ message: "Email already exists." });
      } else if (err.name === "ValidationError") {
        const errors = {};
        for (const field in err.errors) {
          errors[field] = err.errors[field].message;
        }
        return res.status(422).json({ message: "Validation errors", errors });
      } else {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
      }
    }
  });
};
exports.logout = async (req, res) => {
  res.cookie("token", "").json(true);
};
