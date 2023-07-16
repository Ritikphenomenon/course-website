import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateAppBar from "./UpdateAppbar";
import { useNavigate } from "react-router-dom";

function UpShowCourses() {
  
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
          const response = await axios.get("http://localhost:3000/admin/update", {
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
      <UpdateAppBar />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "80vh",
          padding: "100px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            fontSize: "70px",
          }}
        >
          Courses Update Page
        </h1>
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

              courseId={course._id}
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
  const navigate = useNavigate();

  const handleDelete = async (keys) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {

        await axios.delete(`http://localhost:3000/admin/delete/${keys}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.reload();
        // Update the state or refetch the courses after successful deletion
        // ...
      } else {
        console.log("Token not found in localStorage");
      }
    } catch (error) {
      console.error("Error deleting course:", error.message);
    }
  };

  const handlenext = () => {
    navigate(`/courseupdate/${props.courseId}`);
  };

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
        alignItems: "center",
      }}
    >
      <h2
        style={{
          
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
      <img src={props.image} style={{ width: 300 }} alt={props.title} />
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
      <div style={{ display: 'flex', gap: '10px' }}>
  <button
    style={{
      background: 'green',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      cursor: 'pointer',
      outline: 'none',
      fontWeight: 'bold',
      fontSize: '14px',
      flex: 1, // Apply flex property
    }}
    onClick={handlenext}
  >
    Update
  </button>

  <button
    style={{
      background: 'green',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      cursor: 'pointer',
      transition: 'background 0.3s',
      outline: 'none',
      fontWeight: 'bold',
      fontSize: '14px',
      marginLeft: '10px',
      flex: 1, // Apply flex property
    }}
    onClick={() => handleDelete(props.courseId)}
  >
    Delete
  </button>
</div>

    </div>
  );
}

export default UpShowCourses;
