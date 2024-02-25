const express = require("express");
const authenticateController = require("../Controllers/authenticateControllers");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API endpoints for admin users
 */

/**
 * @swagger
 * /Login:
 *   post:
 *     summary: Login endpoint
 *     description: Endpoint for user login
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid credentials
 */
router.post("/Login", authenticateController.Login);

module.exports = router;