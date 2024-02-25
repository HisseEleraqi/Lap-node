const express = require("express");
const morgan = require("morgan");
const upload = require("./Validations/MulterMW");
const controller = require("./Controllers/teacherController");
const mongoose = require("mongoose");
const server = express();
const childRoute = require("./Routes/childRoute");
const classRoute = require("./Routes/classRoute");
const teacherRoute = require("./Routes/teacherRoute");
const authenticationRoute = require("./Routes/authenticateRoute");
const authenticateMW = require("./Validations/AuthenticationMW");
const { bodyValidate } = require("./Validations/teacherValidation");
const validator = require("./Validations/Vlidator");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require("./swaggerSpec");

require("dotenv").config();

const port = process.env.PORT || 8080;

mongoose
  .connect("mongodb://localhost:27017/pd")
  .then(() => {
    console.log("Mongodb connected successfully");
    server.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.error("err", err);
  });

///settings
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(upload.single("image"));


//register
/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: API endpoints for teachers
 */

server.post("/teachers", bodyValidate, validator, controller.insertNewTeachers)

//MWs Authentication
server.use(authenticationRoute);
server.use(authenticateMW);

//Routes
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

///erorrs
server.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});
server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message + " " });
});
