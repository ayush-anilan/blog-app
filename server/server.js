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

// Define routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comment", commentRouter);

// app.use(errorHandler);

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
