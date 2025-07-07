const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const register = async (req, res) => {
  const model = req.body;

  if (model.email && model.name && model.password) {
    try {
      const hashPassword = await bcrypt.hash(model.password, 10);
      const user = new User({
        name: model.name,
        email: model.email,
        password: hashPassword,
      });

      await user.save();
      res.send({ message: "User registered!" });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Registration failed", message: err.message });
    }
  } else {
    res.status(400).json({
      error: "Please provide name, email and password",
    });
  }
};

const login = async (req, res) => {
  const model = req.body;

  if (model.email && model.password) {
    try {
      const user = await User.findOne({ email: model.email });

      if (!user) {
        return res.status(400).json({ error: "Email not found" });
      }

      const isMatchedPassword = await bcrypt.compare(
        model.password,
        user.password
      );

      if (isMatchedPassword) {
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          process.env.SECRET,
          { expiresIn: "1d" }
        );

        return res.json({ token, user });
      }

      return res.status(400).json({ error: "Email or password incorrect" });
    } catch (err) {
      res.status(500).json({ error: "Login failed", message: err.message });
    }
  } else {
    return res.status(400).json({
      error: "Please provide email and password",
    });
  }
};

module.exports = { register, login };
