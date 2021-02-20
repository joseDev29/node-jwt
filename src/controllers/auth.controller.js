const User = require("../models/user.model");
const { encryptPassword, comparePassword } = require("../utils/bcrypt");
const {
  secrets: { jwtSecret },
} = require("../config");

const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password,
    });

    user.password = await encryptPassword(password);

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
      },
      jwtSecret,
      {
        expiresIn: "5m",
      }
    );

    res.json({
      auth: true,
      token,
      message: "successful registration",
    });
  },

  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "email doen´t exists",
      });
    }

    const validatePassword = await comparePassword(password, user.password);

    console.log("---validate", validatePassword);

    if (!validatePassword) {
      return res.status(401).json({
        error: "email or password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      jwtSecret,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      auth: true,
      token,
    });
  },

  me: (req, res, next) => {
    res.status(200).json({
      auth: true,
      message: "protected data access",
      decoded: req.decodedToken,
    });
  },
};
