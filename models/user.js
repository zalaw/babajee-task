const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: Number,
    default: 1,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
