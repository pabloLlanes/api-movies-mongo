const User = require("../api/users/user.model");

//validate role
/* const isValidRole = async (role = "") => {
  const verifyRole = await Role.findOne({ role });
  if (!verifyRole) {
    throw new Error(`${role} invalid role on db`);
  }
}; */

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

module.exports = { /* isValidRole , */ verifyDuplicateEmail, verifyUserById };
