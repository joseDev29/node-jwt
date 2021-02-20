const jwt = require("jsonwebtoken");
const {
  secrets: { jwtSecret },
} = require("../config");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "no token provided",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (err) {
    return res.status(401).json({
      auth: false,
      message: err.message,
    });
  }

  req.decodedToken = decoded;

  next();
};

module.exports = verifyToken;
