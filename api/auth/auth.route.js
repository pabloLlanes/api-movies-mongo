const { Router } = require("express");

const { check } = require("express-validator");
const { login } = require("./auth.controller");

const {
  inputsValidate,
  verifyJwt,
  checkRoles,
  setDefaultRole,
} = require("../../middlewares");

const { createUser } = require("../users/users.controller");

const {
  isValidRole,
  verifyDuplicateEmail,
  verifyUserById,
} = require("../../helpers/dbValidators");

const router = Router();

//register user
router.post(
  "/register",
  [
    checkRoles,
    setDefaultRole,
    check("name", "name is required").isLength({ min: 2, max: 20 }),

    check("email", "email input is empty or invalid").isEmail(),

    check("email").custom(verifyDuplicateEmail),

    check("password", "min characters: 6 ").isLength({ min: 6 }),

    inputsValidate,
  ],
  createUser
);
//login user
router.post(
  "/login",
  [
    check("email", "email input is empty or invalid").isEmail().notEmpty(),

    check("password", "min characters: 6 ").isLength({ min: 6 }),

    inputsValidate,
  ],
  login
);
module.exports = router;
