const mongoose = require("mongoose");
const express = require('express');
const { User, Course, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/index")
const { authenticateJwt } = require("../middleware/index");



const router = express.Router();



router.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });
  
      if (admin) {
        return res.json({ message: 'Admin already exists ,please Login' });
      }
  
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully,please login' });
    } catch (error) {
      console.error('Error during admin signup:', error.message);
      res.status(500).json({ message: 'Server error during admin signup' });
    }
  });

  router.post('/login', async (req, res) => {
    // logic to log in admin
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      console.log("Token:", token); // Log the token
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  
  router.post('/courses', authenticateJwt, async (req, res) => {
    try {
      const { title, description, price, imageLink, published } = req.body;
      const Id=req.user.username;
  
      const course = new Course({
        title,
        description,
        price,
        imageLink,
        published,
        Id
      });
  
      await course.save();
      res.json({ message: 'Course created successfully', courseId: course.id });
    } catch (error) {
      console.error('Error creating course:', error.message);
      res.status(500).json({ message: 'Server error during course creation' });
    }
  });
  
  
  router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    try {
      const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  
      if (course) {
        res.json({ message: 'Course updated successfully' });
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      console.error('Error updating course:', error.message);
      res.status(500).json({ message: 'Server error during course update' });
    }
  });
  
  router.get('/courses', authenticateJwt, async (req, res) => {
    try {
      const courses = await Course.find({});
      res.json({ courses });
    } catch (error) {
      console.error('Error fetching courses:', error.message);
      res.status(500).json({ message: 'Server error during course fetch' });
    }
  });
  
  router.get('/update',authenticateJwt,async (req,res)=>{
     try{
      const courses=await Course.find({Id:req.user.username});
      res.json({ courses });
     }
     catch(error){
      console.error('Error fetching courses:', error.message);
      res.status(500).json({ message: 'Server error during course fetch' });
     }
  })
  router.get("/",async(req, res)=>{
    res.json({"msg":"welcome to admin"})
  })
  
  router.delete('/delete/:id', authenticateJwt, async (req, res) => {
    Course.findByIdAndDelete(req.params.id)
    .then(deletedDocument => {
      res.send('Document deleted successfully');
    })
    .catch(error => {
      console.log('Error:', error);
      res.status(500).send('An error occurred');
    });
  
  });

  
  module.exports = router