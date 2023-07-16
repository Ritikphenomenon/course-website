import React, { useEffect, useState } from "react";
import axios from "axios";
import UsePurchaseAppBar from "./Usepurchbar";
import { useNavigate } from "react-router-dom";

function PurchShowCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate=useNavigate();
  
  const backgroundImages = [
    "../src/images/admin_course.png",
    
  ];

  const getRandomBackground = () => {
    return backgroundImages[0];
  };

  const backgroundImage = getRandomBackground();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/users/purchasedCourses', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setPurchasedCourses(response.data.purchasedCourses);
        } else {
          console.log('Token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching purchased courses:', error.message);
      }
    };

    fetchPurchasedCourses();
  }, []);

  
  const handleviewpurchased = (courseId) => {
    navigate(`/coursepurchaseview/${courseId}`);
  };


  return (
    <div>
      <UsePurchaseAppBar/>
       <div style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "80vh",
    padding: "100px",}}>
      <h1 style={{ textAlign: "center", marginBottom: "20px"  ,  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", fontSize:"70px"}} >Purchased Courses</h1>
      <div style={{ display: "flex", flexWrap: "wrap" ,justifyContent:"center",gap:"20px"}}>
        {purchasedCourses.map((course) => (
          <div
            key={course._id}
            style={{
              border: "1px solid gray",
              borderRadius: "8px",
              padding: "16px",
              margin: "16px",
              width: "300px",
            }}
          >
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <img src={course.imageLink} style={{ width: "100%" }} alt={course.title} />
            
<button
  onClick={() => handleviewpurchased(course._id)}
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
  GO Course
</button>

          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default PurchShowCourses;