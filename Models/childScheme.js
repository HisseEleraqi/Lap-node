const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  building: {
    type: String,
  },
});

const childSchema = new mongoose.Schema({
  // Do not manually define _id here
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["PreKG", "KG1", "KG2"],
  },

  address: {
    type: addressSchema,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
