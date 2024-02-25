const express = require("express");
const controller = require("../Controllers/childController");
const { bodyValidate } = require("../Validations/childValidation");
const validator = require("../Validations/Vlidator");
const router = express.Router();

router
  .route("/child")
  .get(controller.getAllchildren)
  .post(controller.insertChildren)
  .put(bodyValidate, validator, controller.updateChildren)
  .delete(controller.deleteChildren);

module.exports = router;
