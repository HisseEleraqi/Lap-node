const express = require("express");
const morgan = require("morgan");
const upload = require("./Validations/MulterMW");

const mongoose = require("mongoose");
const server = express();
const childRoute = require("./Routes/childRoute");

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
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(upload.single("Images"));
//Routes
server.use(childRoute);
///erorrs
server.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});
server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message + " " });
});
