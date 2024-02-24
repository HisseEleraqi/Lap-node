const child = require("../Models/childScheme");

exports.getAllchildren = (req, res, next) => {
  child
    .find()
    .then((result) => {
      res.status(200).json({
        message: "All children",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
