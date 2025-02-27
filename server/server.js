const express = require("express");

const bodyParser = require("body-parser");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserModel = require("./models/User");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up JWT authentication strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY, // Change this to your secret key
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

app.use("/api", indexRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost: ${port}`);
});
