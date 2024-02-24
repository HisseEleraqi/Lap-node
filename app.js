const express = require("express");
const morgan = require("morgan");
var server = express();
server.use(morgan("dev"));

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
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
