const mongoose = require("mongoose");
const { Schema } = mongoose;

const identityCounterSchema = new Schema({
  name: {
    type: String,
  },
  idx: {
    type: Number,
    default: 1,
  },
});

const IdentityCounter = mongoose.model("identityCounter", identityCounterSchema);

module.exports = IdentityCounter;
