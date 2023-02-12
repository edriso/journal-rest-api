// Modules
const express = require("express");
const morgan = require("morgan");
const app = express();

const postRouter = require("./routes/postRoutes");

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// Add Access Control Allow Origin headers
// https://www.freecodecamp.org/news/access-control-allow-origin-header-explained/
// bug fix: https://stackoverflow.com/a/18643177
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/v1/posts", postRouter);

module.exports = app;
