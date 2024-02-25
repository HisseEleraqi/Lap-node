const Child = require("../Models/childScheme");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");

exports.getAllchildren = (req, res, next) => {
  Child.find()
    .then((result) => {
      res.status(200).json({
        message: "All children",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.insertChildren = (req, res, next) => {
  const imagePath = req.file.path;
  const { _id, fullName, age, level, gender, city, street, building } =
    req.body;
  const address = { city: city, street: street, building: building };
  const child = new Child({
    _id: _id,
    fullName: fullName,
    age: age,
    level: level,
    gender: gender,
    address: address,
    image: imagePath,
  });

  child
    .save()
    .then((child) => {
      const token = jwt.sign(
        {
          id: child._id,
          fullname: child.fullName,
          role: "child",
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(201).json({
        message: "Child added successfully",
        child,
        token,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateChildren = (req, res, next) => {
  Child.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((child) => {
      // check if there is a new image
      if (req.file) {
        const imagePath = child.image;
        // delete image from the server
        fs.unlink(imagePath, (error) => {
          if (error) {
            next(error);
          }
        });
        // update the image path
        child.image = req.file.path;

        // save the updated child
        child.save();
      }
      res.status(200).json({
        message: "Child updated successfully",
        child,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteChildren = (req, res, next) => {
  Child.findByIdAndDelete(req.body._id)
    .then((child) => {
      const imagePath = child.image;
      // delete image from the server
      fs.unlink(imagePath, (error) => {
        if (error) {
          next(error);
        }
      });
      res.status(200).json({
        message: "Child deleted successfully",
        child,
      });
    })
    .catch((error) => {
      next(error);
    });
};
