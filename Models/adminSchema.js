const mongoose = require("mongoose");

// create admin schema
const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// create a model
const admin = mongoose.model("Admin", Schema);

// export the model
module.exports = admin;
