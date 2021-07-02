const User = require("../api/users/user.model");
const Role = require("../api/roles/role.model");

//validate role
const isValidRole = async (roles = "") => {
  const checkRoles = await Role.find({});

  if (checkRoles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        throw new Error(`Role ${req.body.roles[i]} doesnt exists`);
      }
    }
  }
  console.log("checkRoles OK");
};

//verify if duplicate email
const verifyDuplicateEmail = async (email = "") => {
  const VerifyEmail = await User.findOne({ email });
  if (VerifyEmail) {
    throw new Error(`the email: ${email} email has already been registered`);
  }
};

//verify user by id
const verifyUserById = async (id) => {
  const VerifyUser = await User.findById(id);

  if (!VerifyUser) {
    throw new Error(`id: ${id} dont exist `);
  }
};

module.exports = { isValidRole, verifyDuplicateEmail, verifyUserById };
