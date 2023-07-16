const express = require('express');
const { authenticateJwt, SECRET } = require("../middleware/index");
const { User, Course, Admin } = require("../db");
const router = express.Router();



router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (user) {
        return res.json({ message: 'User already exists' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    } catch (error) {
      console.error('Error during user signup:', error.message);
      res.status(500).json({ message: 'Server error during user signup' });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
  
      if (user) {
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
      } else {
        res.status(403).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during user login:', error.message);
      res.status(500).json({ message: 'Server error during user login' });
    }
  });
  
  router.get('/courses', authenticateJwt, async (req, res) => {
    try {
      const courses = await Course.find({ published: true });
      res.json({ courses });
    } catch (error) {
      console.error('Error fetching courses:', error.message);
      res.status(500).json({ message: 'Server error during course fetch' });
    }
  });
  
  router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId);
  
      if (course) {
        const user = await User.findOne({ username: req.user.username });
  
        if (user) {
          user.purchasedCourses.push(course);
          await user.save();
          res.json({ message: 'Course purchased successfully' });
        } else {
          res.status(403).json({ message: 'User not found' });
        }
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      console.error('Error purchasing course:', error.message);
      res.status(500).json({ message: 'Server error during course purchase' });
    }
  });
  
  router.get('/coursedetails/:courseId', authenticateJwt, async (req, res) => {
    try {
      const courseId = req.params.courseId;
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid course ID' });
      }
  
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.json({ course });
    } catch (error) {
      console.error('Error fetching course:', error.message);
      res.status(500).json({ message: 'Server error during course fetch' });
    }
  });
  
  router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    try {
      const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  
      if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching purchased courses:', error.message);
      res.status(500).json({ message: 'Server error during purchased courses fetch' });
    }
  });
  
  
module.exports = router