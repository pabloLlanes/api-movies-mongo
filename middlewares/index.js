const inputsValidate = require("./inputsValidate");
const jwtValidate = require("./jwtValidate");
const verifyRole = require("./verifyRole");

module.exports = {
  ...inputsValidate,
  ...jwtValidate,
  ...verifyRole,
};
