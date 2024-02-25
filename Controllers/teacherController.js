const express = require('express');
const router = express.Router();
const Teacher = require('../Models/teacherSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const Class = require("../Models/classScheme");


exports.getAllTeachers = async (req, res) => {
    try {
        let teachers = await Teacher.find();
        res.status(200).json({ message: "Teachers fetched", data: teachers });
    } catch (error) {
        next(error);
    }
};

exports.insertNewTeachers = (req, res, next) => {
    const image = req.file.path;
    const { fullName, email, password } = req.body;
    const hashedPass = bcrypt.hashSync(password, 10);
    const teacher = new Teacher({ fullName, email, password: hashedPass, image });


    teacher
        .save()
        .then((teacher) => {
            const token = jwt.sign(
                {
                    id: teacher._id,
                    fullname: teacher.fullName,
                    role: "teacher",
                },
                process.env.SECRET_KEY,
                { expiresIn: "24h" }
            );
            res.status(201).json({
                message: "Teacher has been added successfully",
                teacher,
                token
            });
        })
        .catch((error) => {
            next(error);
        });
};


exports.updateTeachers = (req, res, next) => {
    Teacher.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then((teacher) => {
            // check if there is a new image
            if (req.file) {
                const imagePath = teacher.image;
                // delete image from the server
                fs.unlink(imagePath, (error) => {
                    if (error) {
                        next(error);
                    }
                });
                // update the image path
                teacher.image = req.file.path;

                // save the updated teacher
                teacher.save();
            }
            res.status(200).json({
                message: "Teacher updated successfully",
                teacher
            });
        })
        .catch((error) => {
            next(error);
        });
};

exports.deleteTeacher = (req, res, next) => {
    Teacher.findByIdAndDelete(req.body.id)
        .then((teacher) => {
            const imagePath = teacher.image;
            // delete image from the server
            fs.unlink(imagePath, (error) => {
                if (error) {
                    next(error);
                }
            });
            res.status(200).json({
                message: "Teacher deleted successfully",
                teacher
            });
        })
        .catch((error) => {
            next(error);
        });
};

exports.getSupervisorTeachers = (req, res, next) => {
    Class.find({}, { supervisor: 1 })
        .populate("supervisor", "fullName")
        .then((teachers) => {
            res.status(200).json(teachers);
        })
        .catch((error) => {
            next(error);
        });
};

exports.changePassword = (req, res, next) => {
    const { _id, oldPassword, newPassword } = req.body;
    Teacher.findById(_id)
        .then((teacher) => {
            if (!teacher) {
                return res.status(404).send({ message: "Teacher not found" });
            }
            bcrypt.compare(oldPassword, teacher.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send({ message: "Incorrect password" });
                    }
                    const hashedPass = bcrypt.hashSync(newPassword, 10)

                    Teacher.findByIdAndUpdate(_id, { password: hashedPass })
                        .then(() => {
                            res.send({ message: "Password changed successfully" });
                        })
                        .catch((error) => {
                            res.status(500).send({ message: "Internal server error1" });
                        });
                })
                .catch((error) => {
                    res.status(500).send({ message: "Internal server error2" });
                });
        })
        .catch((error) => {
            res.status(500).send({ message: "Internal server error3" });
        });
};

exports.getTeacherById = (req, res, next) => {
    Teacher.findById(req.params["id"])
        .then((teacher) => {
            if (!teacher) throw new Error("Id does not exist");
            res.status(200).json(teacher);
        })
        .catch((error) => {
            next(error);
        })
};
