const express = require("express");
const controller = require("../Controllers/childController");
const { bodyValidate, paramValidate, } = require("../Validations/childValidation");
const validator = require("../Validations/Vlidator");
const router = express.Router();
const { isAdmin } = require("../Validations/AuthenticationMW")

/**
 * @swagger
 * tags:
 *   name: Child
 *   description: API endpoints for managing children
 */

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Get all children
 *     description: Retrieve a list of all children
 *     tags: [Child]
 *     responses:
 *       200:
 *         description: Successful operation
 *   post:
 *     summary: Insert a new child
 *     description: Insert a new child into the database
 *     security:
 *       - bearerAuth: []
 *     tags: [Child]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties here
 *     responses:
 *       200:
 *         description: Successful operation
 *   put:
 *     summary: Update a child
 *     description: Update an existing child in the database
 *     security:
 *       - bearerAuth: []
 *     tags: [Child]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties here
 *     responses:
 *       200:
 *         description: Successful operation
 *   delete:
 *     summary: Delete a child
 *     description: Delete a child from the database
 *     tags: [Child]
 *     responses:
 *       200:
 *         description: Successful operation
 */
router
  .route("/child")
  .get(controller.getAllchildren)
  .post(isAdmin, bodyValidate, validator, controller.insertChildren)
  .put(isAdmin, bodyValidate, validator, controller.updateChildren)
  .delete(controller.deleteChildren);

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get a child by ID
 *     description: Retrieve a child by its ID
 *     tags: [Child]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 */
router.get("/child/:id", paramValidate, validator, controller.getChildById);

module.exports = router;
