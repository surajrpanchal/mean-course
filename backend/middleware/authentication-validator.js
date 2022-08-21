const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header.authentication.split(" ")[1];
    jwt.verify(token, "d66afd65-7291-4b2a-9f44-0d13b8649f47");
    next();
  } catch (error) {
    res.status(401).json({
      isSuccess: false,
      message: "Authentication failed.",
    });
  }
};
