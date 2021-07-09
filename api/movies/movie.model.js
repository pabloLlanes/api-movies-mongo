const { Schema, model } = require("mongoose");

const MovieSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = model("Movie", MovieSchema);
