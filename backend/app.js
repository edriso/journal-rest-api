// Modules
const express = require("express");
const morgan = require("morgan");
const app = express();

const postRouter = require("./routes/postRoutes");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Add Access Control Allow Origin headers
// https://www.freecodecamp.org/news/access-control-allow-origin-header-explained/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/posts", postRouter);

module.exports = app;
