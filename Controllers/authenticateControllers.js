const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../Models/adminSchema");
const teacher = require("../Models/teacherSchema");
require("dotenv").config();

// login
exports.Login = (req, res, next) => {
    const { email, password } = req.body; // get email and password from the request body
    admin.findOne
        ({ email })
        .then((admin) => {
            if (admin) {
                // if the admin is found, compare the password
                bcrypt.compare(password, admin.password, (err, result) => {
                    if (err) {
                        next(err);
                    }
                    if (result) {
                        // if the password is correct, generate a token
                        const token = jwt.sign(
                            {
                                id: admin._id,
                                fullname: admin.fullName,
                                role: "admin",
                            },
                            process.env.SECRET_KEY,
                            { expiresIn: "24h" }
                        );
                        res.status(200).json({
                            message: "Admin logged in successfully",
                            token,
                        });
                    } else {
                        res.status(401).json({ message: "Invalid email or password" });
                    }
                });
            } else {
                // if the admin is not found, check the teacher collection
                teacher.findOne({ email }).then((teacher) => {
                    if (teacher) {
                        // if the teacher is found, compare the password
                        bcrypt.compare(password, teacher.password, (err, result) => {
                            if (err) {
                                next(err);
                            }
                            if (result) {
                                // if the password is correct, generate a token
                                const token = jwt.sign(
                                    {
                                        id: teacher._id,
                                        fullname: teacher.fullName,
                                        role: "teacher",
                                    },
                                    process.env.SECRET_KEY,
                                    { expiresIn: "24h" }
                                );
                                res.status(200).json({
                                    message: "Teacher logged in successfully",
                                    token,
                                });
                            } else {
                                res.status(401).json({ message: "Invalid email or password" });
                            }
                        });
                    } else {
                        res.status(401).json({ message: "Invalid email or password" });
                    }
                });
            }
        })
        .catch((error) => {
            next(error);
        });

};
