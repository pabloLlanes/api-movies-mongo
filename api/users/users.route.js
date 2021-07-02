const { Router } = require("express");
const { check } = require("express-validator");
const { inputsValidate, verifyJwt, checkRoles } = require("../../middlewares");

const {
  isValidRole,
  verifyDuplicateEmail,
  verifyUserById,
} = require("../../helpers/dbValidators");

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  hardDeleteUser,
} = require("./users.controller");

const router = Router();

//get all users
router.get("/", getAllUsers);

//get a single user
router.get("/:id", getSingleUser);

//create user
router.post(
  "/",
  [
    checkRoles,
    check("name", "name is required").isLength({ min: 2, max: 20 }),

    check("email", "email input is empty or invalid")
      .isEmail()
      .isLength({ min: 10, max: 40 }),

    check("email").custom(verifyDuplicateEmail),

    check("password", "min characters: 6 ").isLength({ min: 6 }),
    inputsValidate,
  ],
  createUser
);

//update user
//put
router.put(
  "/:id",
  verifyJwt,

  [
    check("id", "invalid user ID").isMongoId(),
    check("id").custom(verifyUserById),
    check("role").custom(isValidRole),
    inputsValidate,
  ],
  updateUser
);
//disable user
router.delete("/:id", deleteUser);

// delete user
router.delete("/delete/:id", hardDeleteUser);

module.exports = router;
