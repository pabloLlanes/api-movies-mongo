const { Schema, model } = require("mongoose");

const RoleSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Role", RoleSchema);
