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
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  var date = [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("/");
  var time = [this.getHours(), this.getMinutes(), this.getSeconds()].join(":");
  return [date, time].join(" ");
};

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

var date = new Date();
date.yyyymmdd();

app.get("", (req, res, next) => {
  res.status(200).json({
    isSuccess: true,
    message: "Ping successfully to backend",
  });
});

app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
module.exports = app;
