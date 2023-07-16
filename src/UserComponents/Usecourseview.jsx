import React, { useState,useEffect } from "react";
import axios from "axios";
import UseButtonAppBar from "./UseAppbar";
import { useParams } from "react-router-dom";

function UserCourseview (){
   const [courses,setcourses]=useState([]);
   const  {keys} = useParams();
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
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`http://localhost:3000/users/coursedetails/${keys}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setcourses(response.data.course);
        } else {
          console.log('Token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching courses:', error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
       
      <UseButtonAppBar/>
       <div style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "80vh",
    padding: "100px",}}>
      <h1 style={{ textAlign: "center", marginBottom: "20px"  ,  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", fontSize:"70px"}} >Courses Page</h1>
      <div style={{ display: "flex", flexWrap: "wrap" ,justifyContent:"center",gap:"20px"}}>
        
          <div
            key={courses._id}
            style={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "16px",
              margin: "16px",
              width: "300px",
            }}
          >
            <h2>{courses.title}</h2>
            <p>{courses.description}</p>
            <img src={courses.imageLink} style={{ width: "100%" }} alt={courses.title} />
            <button
  onClick={() => handlePurchase(courses._id)}
  style={{ background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background 0.3s",
    outline: "none",
    fontWeight: "bold",
    fontSize: "14px"
  }}
>
  Purchase
</button>


</div>
      
      </div>
    </div>
    </div>
  );


  

}

export default UserCourseview;