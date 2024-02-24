const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var server = express();
server.use(morgan("dev"));

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

////Auth middel were

server.use((req, res, next) => {
  console.log("Authorized", req.url, req.method);
});

///settings
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Routes

///erorrs
server.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});
server.use((err, req, res, next) => {
  res.status(500).json({ message: err.message + " " });
});
