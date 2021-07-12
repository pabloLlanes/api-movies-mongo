const { request, response } = require("express");
const { configEnv } = require("../../utils/config");

const jwt = require("jsonwebtoken");

const User = require("../users/user.model");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    //verify if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "invalid user or password" });
    }

    //verify active user
    if (!user.enable) {
      return res.status(400).json({
        msg: "user is disable"
      });
    }

    //verify match password
    const matchPassword = await User.comparePassword(password, user.password);

    if (!matchPassword)
      return res
        .status(401)
        .json({ token: null, message: "invalid user or password" });

    const token = jwt.sign({ id: user._id }, configEnv.privateKey, {
      expiresIn: 84600
    });
    res.json({
      msg: `welcome ${user.name}`,
      token
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: "internal server error: login"
    });
  }
};
module.exports = {
  login
};
