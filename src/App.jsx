import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import Home from './Home/Home';
import UserLogin from './UserComponents/UseLogin';
import UserRegister from './UserComponents/UseRegister';
import UseShowCourses from './UserComponents/UseShowcourses';
import PurchShowCourses from './UserComponents/Userpuchased';
import UpShowCourses from './components/UpdateCourse';
import CourseUpdate from './components/CourseUpdate';
import UserCourseview from './UserComponents/Usecourseview';
import Userpurchaseview from './UserComponents/Useviewpurchase';


// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/create" element={<CreateCourse />} />
                <Route path="/update" element={<UpShowCourses />} />
                <Route path="/courseupdate/:keys" element={<CourseUpdate />} />
                <Route path="/userlogin" element={< UserLogin/>} />
                <Route path="/useregister" element={<UserRegister />} />
                <Route path="/usercourses" element={<UseShowCourses />} />
                <Route path="/purchased" element={<PurchShowCourses />} />
                <Route path="/courseview/:keys" element={<UserCourseview />} />
                <Route path="/coursepurchaseview/:keys" element={<Userpurchaseview />} />



            </Routes>
        </Router>
    );
}

export default App;