const express = require("express");
const Post = require("../models/post");

const postRouter = express.Router();

postRouter.post("", (req, res) => {
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
        _id: document._id,
      });
    })
    .catch(() => {
      res.status(500).json({
        isSuccess: false,
        message: "while saving post error has been encountered",
      });
    });
});

postRouter.put("/:id", (req, res) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then((document) => {
      res.status(201).json({
        isSuccess: true,
        message: "posts saved successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        isSuccess: false,
        message: "while saving post error has been encountered",
      });
    });
});

postRouter.get("", (req, res, next) => {
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

postRouter.get("/:id", (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((document) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        post: document,
      });
    })
    .catch(() => {
      res.status(404).json({
        isSuccess: false,
        message: "Post not found",
      });
    });
});

postRouter.delete("/:id", (req, res, next) => {
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

module.exports = postRouter;
