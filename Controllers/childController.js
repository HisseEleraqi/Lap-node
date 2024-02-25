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
  // Check if the file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const imagePath = req.file.path;
  const { fullName, age, level, gender, city, street, building } = req.body;
  const address = { city, street, building };

  const child = new Child({
    fullName,
    age,
    level,
    gender,
    address,
    image: imagePath,
  });

  child
    .save()
    .then((child) => {
      const token = jwt.sign(
        { id: child._id, fullname: child.fullName, role: "child" },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res
        .status(201)
        .json({ message: "Child added successfully", child, token });
    })
    .catch(next);
};

exports.updateChildren = (req, res, next) => {
  const updateData = req.body;

  if (req.file) {
    updateData.image = req.file.path; // Update with new image path
  }

  Child.findByIdAndUpdate(req.body._id, updateData, { new: true })
    .then((child) => {
      if (!child) {
        return res.status(404).json({ message: "Child not found" });
      }
      // Optionally handle old image deletion here if a new image was uploaded
      res.status(200).json({ message: "Child updated successfully", child });
    })
    .catch(next);
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
