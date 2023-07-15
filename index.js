const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


const SECRET = process.env.ACCESS_SECRET_KEY; // This should be in environment variables

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: { type: String },
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
  Id:String
  });
  
  

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        console.error('Error verifying JWT:', err.message);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
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
app.post('/admin/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (admin) {
      return res.json({ message: 'Admin already exists ,please Login' });
    }

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully,please login', token });
  } catch (error) {
    console.error('Error during admin signup:', error.message);
    res.status(500).json({ message: 'Server error during admin signup' });
  }
});
app.post('/admin/login', async (req, res) => {
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


app.post('/admin/courses', authenticateJwt, async (req, res) => {
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


app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
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

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ message: 'Server error during course fetch' });
  }
});

app.get('/admin/update',authenticateJwt,async (req,res)=>{
   try{
    const courses=await Course.find({Id:req.user.username});
    res.json({ courses });
   }
   catch(error){
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ message: 'Server error during course fetch' });
   }
})

app.delete('/admin/delete/:id', authenticateJwt, async (req, res) => {
  Course.findByIdAndDelete(req.params.id)
  .then(deletedDocument => {
    res.send('Document deleted successfully');
  })
  .catch(error => {
    console.log('Error:', error);
    res.status(500).send('An error occurred');
  });

});


// User routes
app.post('/users/signup', async (req, res) => {
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

app.post('/users/login', async (req, res) => {
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

app.get('/users/courses', authenticateJwt, async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ message: 'Server error during course fetch' });
  }
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
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

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
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

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
