const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const userRouter = express.Router();

userRouter.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
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

userRouter.post("/login", (req, res, next) => {
  console.log("request received");
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          isSuccess: false,
          message: "User is not exists.",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        res.status(401).json({
          isSuccess: false,
          message: "Authentication failed.",
        });
      } else {
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "d66afd65-7291-4b2a-9f44-0d13b8649f47",
          { expiresIn: "2h" }
        );
        var tokenexpireIn = new Date();
        tokenexpireIn.addHours(2);
        res.status(200).json({
          isSuccess: true,
          message: "Logged in successfully",
          token: token,
          expiresIn: tokenexpireIn.yyyymmdd(),
        });
      }
    })
    .catch((err) => {
      res.status(401).json({
        isSuccess: false,
        message: "Authentication failed." + err,
      });
    });
});

module.exports = userRouter;
