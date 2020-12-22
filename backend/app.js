const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRouter = require("./routers/posts");
const userRouter = require("./routers/user");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/mean", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "mean",
  })
  .then(() => {
    console.error("Connected to database");
  })
  .catch(() => {
    console.error("Connection with database failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
module.exports = app;
