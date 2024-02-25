// require all variables
const mongoose = require("mongoose");

// create teacher schema
const Schema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// create a model
const teacher = mongoose.model("Teacher", Schema);

// export the model
module.exports = teacher;
