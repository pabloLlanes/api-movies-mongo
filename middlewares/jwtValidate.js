const { response, request } = require("express");

const jwt = require("jsonwebtoken");
const User = require("../api/users/user.model");

const verifyJwt = async (req = request, res = response, next) => {
  const token = req.header("x-access-token");
  if (!token) {
    return res.status(401).json({ msg: "unauthorize, token is required" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.PRIVATEKEY);

    //search user by uid
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({ msg: "user not encountered" });
    }

    //verify if user is enable
    if (!user.enable) {
      return res.status(403).json({ msg: "user is disable" });
    }

    req.user = user;

    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ msg: "invalid token" });
  }
};

module.exports = { verifyJwt };
