import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonAppBar from "./Appbar";

function Options() {
  const navigate = useNavigate();

  const handleCreateCourse = () => {
    navigate("/create");
  };




  const backgroundImages = [
    "../src/images/user_option.png",
    
  ];

  const getRandomBackground = () => {
    return backgroundImages[0];
  };

  const backgroundImage = getRandomBackground();



  return (
    <div>

      <ButtonAppBar/>

    <div  style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "80vh",
      padding: "80px",
      marginTop:""
     }}>

      <div style={{
        marginTop:"100px"
      }}>

      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Select an option:
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >

        <div
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Show Courses</h2>
          <Link
            to="/courses"
            style={{
              display: "inline-block",
              backgroundColor: "#4caf50",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              textDecoration: "none",
              marginTop: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            View Courses
          </Link>
        </div>


        <div
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Create Course</h2>
          <button
            onClick={handleCreateCourse}
            style={{
              display: "inline-block",
              backgroundColor: "#4caf50",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              textDecoration: "none",
              marginTop: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Create
          </button>
        </div>



        <div
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Update Courses</h2>
          <Link
            to="/update"
            style={{
              display: "inline-block",
              backgroundColor: "#4caf50",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              padding: "8px 16px",
              textDecoration: "none",
              marginTop: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Update
          </Link>
        </div>
        
        </div>
      </div>
      </div>
    </div>
  );
}

export default Options;