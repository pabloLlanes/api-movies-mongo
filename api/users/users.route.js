const { Router } = require("express");
const { check } = require("express-validator");
const {
  inputsValidate,
  verifyJwt,
  isAdminRole,
  ifExistRole,
} = require("../../middlewares");

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
    check("name", "name is required and min: 2 , max: 20 characters")
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 20 }),
    check("email", "invalid format email").isEmail(),
    check("email").custom(verifyDuplicateEmail),
    check("password", "min characters: 6 ").isLength({ min: 6 }),
    inputsValidate,
  ],
  createUser
);

//update user
router.put("/:id", updateUser);

//disable user
router.delete("/:id", deleteUser);

// delete user
router.delete("/delete/:id", hardDeleteUser);

module.exports = router;
