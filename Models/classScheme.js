// require all variables
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// create class a schema
const Schema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    children: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Child",
    },
  },
  { _id: false }
);

// auto increment
Schema.plugin(AutoIncrement, { inc_field: "_id" });
// create a model
const _class = mongoose.model("Class", Schema);

// export the model
module.exports = _class;
