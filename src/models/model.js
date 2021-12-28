const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const schema = new Schema(
  {
    key: {
      type: String,
    },
    value: {
      type: String,
    },
    counts: {
      type: [Number],
    },
  },
  {
    timestamps: true,
  }
);
const model = mongoose.model("record", schema, "records");

module.exports = model;
