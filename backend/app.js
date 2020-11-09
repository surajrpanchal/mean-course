const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRouter = require("./routers/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://surajrpanchal:QgwzbRFaSTga3hdu@mean-applicaion-cluster.pjo7i.mongodb.net/mean",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
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

module.exports = app;
