const express = require('express');
const router = express.Router();
const Class = require('../Models/classScheme');
// require = ('dotenv').config();

exports.getAllClasses = async (req, res, next) => {
    try {
        let classes = await Class.find();
        res.status(200).json({ message: "Classes fetched", data: classes });
    } catch (error) {
        next(error);
    }
};

exports.insertClass = async (req, res, next) => {
    try {
        let newClass = new Class(req.body);
        let result = await newClass.save();
        res.status(201).json({ message: "Class added", data: result });
    } catch (error) {
        next(error);
    }
}

exports.updateClass = async (req, res, next) => {
    try {
        let updatedClass = await Class.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!updatedClass) {
            let error = new Error("Class not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Class updated", data: updatedClass });
    } catch (error) {
        next(error);
    }
}

exports.deleteClass = async (req, res, next) => {
    try {
        let deletedClass = await Class.findByIdAndDelete
            (req.body._id);
        if (!deletedClass) {
            let error = new Error("Class not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Class deleted", data: deletedClass });
    } catch (error) {
        next(error);
    }
}

exports.getClassById = async (req, res, next) => {
    try {
        let classId = req.params.id;
        let classData = await Class.findById(classId);
        if (!classData) {
            let error = new Error("Class not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Class found", data: classData });
    } catch (error) {
        next(error);
    }
}

exports.getStudentByClassId = (req, res, next) => {
    Class.findById(req.params["id"])
        .populate("children")
        .then((c) => {
            if (!c) throw new Error("Id does not exist");
            res.status(200).json(c.children);
        })
        .catch((error) => {
            next(error);
        });
};


exports.getTeacherByClassId = (req, res, next) => {
    Class.findById(req.params["id"])
        .populate("supervisor")
        .then((c) => {
            if (!c) throw new Error("Id does not exist");
            res.status(200).json(c.supervisor);
        })
        .catch((error) => {
            next(error);
        });
};
