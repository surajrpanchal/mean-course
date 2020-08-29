const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    isSuccess: true,
    message: "posts saved successfully",
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "asdnasdsas",
      title: "First Post",
      content: "first post content",
    },
    {
      id: "osahfwefgsl",
      title: "Second Post",
      content: "second post content",
    },
  ];

  res.status(200).json({
    message: "Posts fetched successfully",
    posts: posts,
    count: posts.length,
  });
});

module.exports = app;
