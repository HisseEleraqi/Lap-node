const { body, param } = require("express-validator");


exports.bodyValidate = [
    body("name").isString().withMessage("Full Name must be a string")
        .isLength({ min: 3, max: 50 }).withMessage("Full Name must be between 3 to 50 characters"),
    body("supervisor").isString().withMessage("Supervisor must be a string"),
    body("children").isArray().withMessage("Children must be an array of Numbers"),
]

exports.paramValidate = [
    param("id").isNumeric().withMessage("Id must be a number")
]
