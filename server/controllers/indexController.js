const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(422).json(err);
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", "").json(true);
};
