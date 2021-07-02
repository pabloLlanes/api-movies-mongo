const inputsValidate = require("./inputsValidate");
const jwtValidate = require("./jwtValidate");
const roleValidate = require("./roleValidate");

module.exports = {
  ...inputsValidate,
  ...jwtValidate,
  ...roleValidate,
};
