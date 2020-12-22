const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.username,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res
          .status(201)
          .json({ message: "User has been created", result: result });
      })
      .catch((err) => {
        res.status(500).json({
          message: "There is some issue while creating User",
          error: err,
        });
      });
  });
});

module.exports = userRouter;
