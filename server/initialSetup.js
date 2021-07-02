const Role = require("../api/roles/role.model");
const User = require("../api/users/user.model");

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    const role = await Role.findOne({ name: "admin" });
    const role2 = await Role.findOne({ name: "moderator" });

    const newUserAdmin = await new User({
      name: "the administrator",
      username: "admin",
      email: "admin@gmail.com",
      password: await User.encryptPassword("123456"),
      roles: [role._id, role2._id],
    });

    await newUserAdmin.save();
  } catch (e) {
    console.error(e);
    res.status(500).res.json({ msg: "internal server error: initial setup" });
  }
};

module.exports = { createRoles };
