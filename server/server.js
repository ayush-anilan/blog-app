const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/api/blogs", require("./routes/blogRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost: ${port}`);
});
