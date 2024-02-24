const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  building: { type: String, required: true },
});

const scheme = new mongoose.Schema({
  _id: { type: Number, unique: true, require: true },

  fullName: { type: String, required: true },

  level: { type: String, enum: ["PreKG", "KG1", "KG2"], require: true },

  gender: { type: String, enum: ["Male", "Female"], require: true },

  age: { type: Number, require: true },

  location: { type: addressSchema, require: true },
});

module.exports = mongoose.model("child", scheme);
