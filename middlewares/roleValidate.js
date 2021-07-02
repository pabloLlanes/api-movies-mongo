const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: " error user token ",
    });
  }
  const { role, name } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} is not a administrator!`,
    });
  }
  next();
};

const ifExistRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "verify token for validate role ",
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `${roles} roles are required  `,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  ifExistRole,
};
