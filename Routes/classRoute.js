const express = require("express");
const controller = require("../Controllers/classController");
const { bodyValidate } = require("../Validations/ClassValidation");
const validator = require("../Validations/Vlidator");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Class
 *   description: API endpoints for managing classes
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     tags: [Class]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Insert a new class
 *     tags: [Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add your properties here
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Update a class
 *     tags: [Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add your properties here
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete a class
 *     tags: [Class]
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/class")
    .get(controller.getAllClasses)
    .post(bodyValidate, validator, controller.insertClass)
    .put(bodyValidate, validator, controller.updateClass)
    .delete(controller.deleteClass);

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get students by class ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/class/child/:id")
    .get(controller.getStudentByClassId);

/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get teacher by class ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/class/teacher/:id")
    .get(controller.getTeacherByClassId);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/class/:id")
    .get(controller.getClassById);

module.exports = router;