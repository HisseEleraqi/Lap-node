const express = require("express");
const controller = require("../Controllers/teacherController");
const { bodyValidate, paramValidate, changePasswordValidate } = require("../Validations/teacherValidation");
const { isAdmin } = require("../Validations/AuthenticationMW")
const validator = require("../Validations/Vlidator");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: API endpoints for managing teachers
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     description: Retrieve a list of all teachers
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: A list of teachers
 *   post:
 *     summary: Insert a new teacher
 *     description: Insert a new teacher into the system
 *     security:
 *       - bearerAuth: []
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           
 *     responses:
 *       200:
 *         description: Successfully inserted a new teacher
 *   put:
 *     summary: Update teachers
 *     description: Update multiple teachers in the system
 *     security:
 *       - bearerAuth: []
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           
 *     responses:
 *       200:
 *         description: Successfully updated teachers
 *   delete:
 *     summary: Delete a teacher
 *     description: Delete a teacher from the system
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: Successfully deleted a teacher
 */
router.route("/teachers")
    .get(controller.getAllTeachers)
    .post(isAdmin, bodyValidate, validator, controller.insertNewTeachers)
    .put(isAdmin, bodyValidate, validator, controller.updateTeachers)
    .delete(controller.deleteTeacher);

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Get teachers supervised by supervisors
 *     description: Retrieve a list of teachers supervised by supervisors
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: A list of teachers supervised by supervisors
 */
router.route("/teachers/supervisors")
    .get(controller.getSupervisorTeachers);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     description: Retrieve a teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A teacher object
 */
router.route("/teachers/:id")
    .get(paramValidate, validator, controller.getTeacherById);

/**
 * @swagger
 * /teachers/changePassword:
 *   put:
 *     summary: Change teacher's password
 *     description: Change teacher's password
 *     security:
 *       - bearerAuth: []
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           
 *     responses:
 *       200:
 *         description: Successfully changed teacher's password
 */
router.route("/teachers/changePassword")
    .put(changePasswordValidate, validator, controller.changePassword);

module.exports = router;
