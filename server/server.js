const express = require("express");

const bodyParser = require("body-parser");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User");
// set up mongoose connection
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Connected to database");
}

const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Set up JWT authentication strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secretkey", // Change this to your secret key
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    // Here you should fetch user details from database using `jwt_payload.sub` (user ID)
    // Replace this with your own code to fetch user details
    UserModel.findById(jwt_payload.sub, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
// Initialize Passport.js
app.use(passport.initialize());

// 4. Define the models
const PostModel = require("./models/Post");
const CommentModel = require("./models/Comment");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/posts", postRouter);
app.use("/comment", commentRouter);

// app.use(errorHandler);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
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
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await UserModel.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.get("/user", verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, "secretkey");
    const user = await UserModel.findById(decoded.id);
    res.json(user);
  } catch (error) {
    res.status(403).json({ message: "Unauthorized" });
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json(true);
});

app.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await UserModel.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Format of token
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

app.listen(port, () => {
  console.log(`Server running on http://localhost: ${port}`);
});
