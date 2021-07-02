//const Role = require("../api/roles/role.model");

const ROLES = ["user", "moderator", "admin"];

const checkRoles = async (req, res, next) => {
  console.log(req.body.roles);
  const { roles } = req.body;
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} doesnt exists`,
        });
      }
    }
  }
  console.log("checkRoles OK");
  next();
};
const setDefaultRole = (req, res, next) => {
  req.body.roles = ["user"];

  next();
};
module.exports = { checkRoles, setDefaultRole };
