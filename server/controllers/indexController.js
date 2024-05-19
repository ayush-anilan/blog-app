const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profilepics/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage }).single("profilePicture");

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
          const profilePicturePath = user.profilePicture
            ? user.profilePicture.replace(/\\/g, "/")
            : null;
          res.cookie("token", token).json({
            message: "login successful",
            token,
            user: {
              id: user._id,
              name: user.name,
              profilePicture: profilePicturePath,
            },
          });
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
};

exports.register = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(422).json({ message: "Error uploading file." });
    }

    const { name, email, password } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    try {
      const userDoc = await User.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        profilePicture: profilePicture,
      });
      res.json(userDoc);
    } catch (err) {
      // Handle specific errors
      if (err.code === 11000 && err.keyValue.email) {
        // Duplicate email error (MongoDB)
        return res.status(422).json({ message: "Email already exists." });
      } else if (err.name === "ValidationError") {
        // Mongoose validation error
        const errors = {};
        for (const field in err.errors) {
          errors[field] = err.errors[field].message;
        }
        return res.status(422).json({ message: "Validation errors", errors });
      } else {
        console.error(err); // Log unexpected errors
        return res.status(500).json({ message: "Internal server error." });
      }
    }
  });
};

exports.logout = async (req, res) => {
  res.cookie("token", "").json(true);
};
