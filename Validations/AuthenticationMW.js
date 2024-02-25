const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //get the token from the header
  try {
    console.log(req.get("authorization"));
    let token = req.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.token = decodedToken;
    next();
  } catch (error) {
    error.message = "Not authenticated";
    error.statusCode = 401;
    next(error);
  }
};

// authentication middleware
module.exports.isAdmin = (req, res, next) => {
  if (req.token.role !== "admin") {
    let error = new Error("Not authorized");
    error.statusCode = 403;
    next(error);
  } else {
    next();
  }
};

module.exports.isTeacher = (req, res, next) => {
  if (req.token.role !== "teacher") {
    let error = new Error("Not authorized");
    error.statusCode = 403;
    next(error);
  } else {
    next();
  }
};
