import express, { router } from "express";
import mongoose from 'mongoose';
const router = express.Router();
import { Admin, Course } from "./../db/index";
import jwt from "jsonwebtoken";
import authenticateJWT from "../middleware/auth";
const dotenv = require("dotenv");
dotenv.config();


// create admin
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const adminExist = await Admin.findOne({ username });
    if (!adminExist) {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET);
        res.json({ message: 'Admin Created Successfully', token });
    }
    else {
        res.status(403).json({ message: 'Admin already exists' });
    }

});

//login admin
router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const adminExist = await Admin.findOne({ username, password });
    if (adminExist) {
        const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET);
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

// add courses
router.post('/course', authenticateJWT, async (req, res) => {
    const { title, desc, price, imageLink } = req.body;
    const newCourse = await new Course({
        title,
        desc,
        price,
        imageLink
    });
    await newCourse.save();
    res.json({ message: 'Course created successfully', courseId: newCourse.id });
});

//get all courses
router.get('/courses', authenticateJWT, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

// get particular course
router.get('/course/:courseId', authenticateJWT, (req,res) => {
    const course = await Course.findById(req.params.courseId);
    res.json({course});
})

//update courses
router.put('/course/:courseId', authenticateJWT, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: "Course Update Successfully" });
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
});


module.exports = router;