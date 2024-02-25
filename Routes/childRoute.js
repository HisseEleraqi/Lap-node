const express = require("express");
const controller = require("../Controllers/childController");
const { bodyValidate } = require("../Validations/childValidation");
const validator = require("../Validations/Vlidator");
const router = express.Router();

router;
router
  .route("/child")
  .get(controller.getAllchildren)
  .post(bodyValidate, validator, controller.insertChildren)
  .put(bodyValidate, validator, controller.updateChildren)
  .delete(controller.deleteChildren);

module.exports = router;
