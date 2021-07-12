const { Schema, model } = require("mongoose");

const ActorSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true
    },
    enable: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = model("Actor", ActorSchema);
