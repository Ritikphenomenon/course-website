

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister() {

  

  const backgroundImages = [
    "../src/images/admin_register.png",
    
  ];

  const getRandomBackground = () => {
    return backgroundImages[0];
  };

  const backgroundImage = getRandomBackground();

  const navigate=useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/signup", {
        username: username,
        password: password,
      });
      console.log(response.data.message);
      navigate("/userlogin");
    } catch (error) {
      console.error("Error registering user:", error.response.data.message);
      // Display error message or perform error handling
    }
  };


  return (
       <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "80vh",
        padding: "100px",
       }}>
        <div style={{ 
        maxWidth: "400px",
        marginLeft:"35%",
        marginTop:"10%",
         padding: "20px", 
         border: "1px solid #ccc", 
         borderRadius: "10px", 
         backgroundColor: "#f5f5f5" }}>
  
        <h1 style={{ fontSize: "24px",
         marginBottom: "20px" }}>
  
          Register  As a User
  
          </h1>
  
        <br />
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} style={
          { width: "100%",
           padding: "10px", 
           marginBottom: "10px",
            border: "1px solid #ccc",
             borderRadius: "5px" }
          
          } />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} style={{ width: "100%",
         padding: "10px", 
         marginBottom: "10px", 
         border: "1px solid #ccc",
          borderRadius: "5px" }} />
        <br />
        <button onClick={handleRegister} style={{ width: "100%",
         padding: "10px",
          backgroundColor: "#4caf50",
           color: "white", 
           border: "none", 
           borderRadius: "5px",
            cursor: "pointer" }}>Register</button>
        <br />
       <span>Already a admin? <a href="/userlogin">Login</a></span> 
    </div>
    </div>
  );
}

export default UserRegister;
