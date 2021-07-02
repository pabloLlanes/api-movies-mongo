const { Router } = require("express");

//const { check } = require("express-validator");
const { login } = require("./auth.controller");
const { createUser } = require("../users/users.controller");

const router = Router();

//register user
router.post("/",  createUser);

//login user
router.post("/:id", login);

module.exports = router;
