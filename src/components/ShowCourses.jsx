import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonAppBar from "./Appbar.jsx";

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  
  const backgroundImages = [
    "../src/images/admin_course.png",
    
  ];

  const getRandomBackground = () => {
    return backgroundImages[0];
  };

  const backgroundImage = getRandomBackground();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:3000/admin/courses", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCourses(response.data.courses);
        } else {
          console.log("Token not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
 <ButtonAppBar/>
    <div style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "80vh",
    padding: "100px",}}>
     
      <h1 style={{ textAlign: "center", marginBottom: "20px"  ,  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", fontSize:"70px"}}>Courses Page</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            title={course.title}
            description={course.description}
            price={course.price}
            image={course.imageLink}
          />
        ))}
      </div>
    </div>
    </div>
  );
}

function CourseCard(props) {
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        borderRadius: "10px",
        padding: "20px",
        width: "300px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          marginBottom: "10px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333333",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        {props.title}
      </h2>
      <p
        style={{
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "16px",
          color: "#666666",
        }}
      >
        {props.description}
      </p>
      <img src={props.image} style={{width: 300}} ></img>
      <h3
        style={{
          background: "black",
          fontSize: "30px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {props.price}
      </h3>
    </div>
  );
}

export default ShowCourses;
