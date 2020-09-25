const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");

const app = express();
mongoose
  .connect(
    "mongodb+srv://surajrpanchal:QgwzbRFaSTga3hdu@mean-applicaion-cluster.pjo7i.mongodb.net/mean?retryWrites=true&w=majority",
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post
    .save()
    .then((document) => {
      res.status(201).json({
        isSuccess: true,
        message: "posts saved successfully",
        _id: document._id
      });
    })
    .catch(() => {
      res.status(500).json({
        isSuccess: false,
        message: "while saving post error has been encountered",
      });
    });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        count: documents.length,
        posts: documents,
      });
    })
    .catch(() => {
      res.status(500).json({
        isSuccess: false,
        message: "while fetching post error has been encountered",
      });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((documents) => {
      res.status(200).json({
        isSuccess: true,
        message: "Posts deleted successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        isSuccess: false,
        message: "while deleting post error has been encountered",
      });
    });
});

module.exports = app;
