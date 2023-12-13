const express = require('express');

const { Course, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('./../middleware/auth');
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();


//profile route
router.get("/me", authenticateJWT ,async(req,res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    });
})


// create admin
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const adminExist = await Admin.findOne({ username });
    if (!adminExist) {
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin Created Successfully', token });
    }
    else {
        res.status(403).json({ message: 'Admin already exists' });
    }

});

//login admin
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const adminExist = await Admin.findOne({ username, password });
    if (adminExist) {
        const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

// add courses
router.post('/courses', authenticateJWT, async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.json({ message: 'Course created successfully', courseId: newCourse.id });
});

//get all courses
router.get('/courses', authenticateJWT, async (req, res) => {
    console.log("here");
    const courses = await Course.find({});
    console.log(courses);
    res.json({ courses });
});

// get particular course
router.get('/courses/:courseId', authenticateJWT, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    res.json({ course });
})

//update courses
router.put('/courses/:courseId', authenticateJWT, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: "Course Update Successfully" });
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
});


module.exports = router;