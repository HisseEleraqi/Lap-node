const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let Token = jwt.verify(token, process.env.SECRET_KEY);
    req.token = Token;
    next();
  } catch (error) {
    error.message = "User is not authenticated";
    error.statusCode = 401;
    next(error);
  }
};


module.exports.isAdmin = (req, res, next) => {
  if (req.token.role !== "admin") {
    let error = new Error("User is not authenticated");
    error.statusCode = 403;
    next(error);
  } else {
    next();
  }
};

module.exports.isTeacher = (req, res, next) => {
  if (req.token.role !== "teacher") {
    let error = new Error("User is not authenticated");
    error.statusCode = 403;
    next(error);
  } else {
    next();
  }
};
