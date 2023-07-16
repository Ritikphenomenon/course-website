const serverless = require('serverless-http')
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const userRouter=require("./routes/user");

const adminRouter=require("./routes/admin")


const router = express.Router();

router.get("/",(req , res)=>{
  res.json({"name":"Pandey"})
})

router.use("/admin",adminRouter);
router.use("/users",userRouter);



dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qrbpmic.mongodb.net/courses`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'courses'
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Admin routes


module.exports = router

