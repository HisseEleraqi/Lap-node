const { body, param } = require("express-validator");

exports.bodyValidate = [
  body("fullName")
    .isString()
    .withMessage("Full Name must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full Name must be between 3 to 50 characters"),
  body("age")
    .isNumeric()
    .withMessage("Age must be a number")
    .custom((value) => {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
      return true;
    }),
  body("level").custom((value) => {
    if (value !== "PreKG" && value !== "KG1" && value !== "KG2") {
      throw new Error("Level must be PreKG, KG1 or KG2");
    }
    return true;
  }),
  body("gender").custom((value) => {
    if (value !== "male" && value !== "female") {
      throw new Error("gender must be male or female");
    }
    return true;
  }),
  body("city").isString().withMessage("City must be a string"),
  body("street").isString().withMessage("Street must be a string"),
  body("building").isString().withMessage("Building must be a string"),
];

exports.paramValidate = [
  param("id").isString().withMessage("Id must be a number"),
];
