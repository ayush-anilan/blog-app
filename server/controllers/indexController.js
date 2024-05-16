const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

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
        "secretkey",
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
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
        profilePicture: profilePicture, // Save profile picture path
      });
      res.json(userDoc);
    } catch (err) {
      res.status(422).json(err);
    }
  });
};

exports.logout = async (req, res) => {
  res.cookie("token", "").json(true);
};
