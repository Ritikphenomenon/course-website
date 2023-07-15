import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Options from './components/Options';
import UserLanding from './UserComponents/UseLanding';
import Home from './Home/Home';
import UserLogin from './UserComponents/UseLogin';
import UserRegister from './UserComponents/UseRegister';
import UserOptions from './UserComponents/UserOption';
import UseShowCourses from './UserComponents/UseShowcourses';
import PurchShowCourses from './UserComponents/Userpuchased';
import UpShowCourses from './components/UpdateCourse';
import '../src/App.css'
import CourseUpdate from './components/CourseUpdate';


// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/adminlanding" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/create" element={<CreateCourse />} />
                <Route path="/options" element={<Options />} />
                <Route path="/userlanding" element={<UserLanding />} />
                <Route path="/userlogin" element={< UserLogin/>} />
                <Route path="/useregister" element={<UserRegister />} />
                <Route path="/useroptions" element={<UserOptions />} />
                <Route path="/usercourses" element={<UseShowCourses />} />
                <Route path="/purchased" element={<PurchShowCourses />} />
                <Route path="/update" element={<UpShowCourses />} />
                <Route path="/courseupdate/:keys" element={<CourseUpdate />} />



            </Routes>
        </Router>
    );
}

export default App;