const { authenticateJWT } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { User, Course, Admin } = require("../db");
const express = require('express');
const router = express.Router();

// create user
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });
    if (!userExists) {
        const newUser = new User({ username, password });
        await newUser.save();

        const token = jwt.sign({ username, role: 'user' }, process.env.SECRET);
        res.json({ message: 'User Created Successfully', token });
    }
    else {
        res.status(403).json({ message: 'User already exists' });
    }
});

//login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username, password });
    if (userExists) {
        const token = jwt.sign({ username, role: 'user' }, process.env.SECRET);
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

// get all Courses
router.get('/courses', authenticateJWT, async (req, res) => {
    const courses = await Course.find({ published: true });
    res.json({ courses });
});

// post purchased course identified by courseID to a user's account
router.post('/courses/:courseId', authenticateJWT, async(req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
        const user = await User.findOne({ username: req.user.username });

        if (user) {
            user.purchasedCourses.push_back(course);
            await user.save();
            res.json({ message: 'Course purchased successfully' });
        } else {
            res.status(403).json({ message: "User not found" });
        }
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
    res.json({ course });
})

router.get('/purchasedCourses', authenticateJWT, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
});

module.exports = router;