

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import UseLoginAppBar from "./UseLoginbar";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserLogin() {


  const backgroundImages = [
    "../src/images/Login_back.jpg",
    
  ];

  const getRandomBackground = () => {
    return backgroundImages[0];
  };

  const backgroundImage = getRandomBackground();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[message,newmessage]=useState("");
  const[hidden,sethidden]=useState("hidden")

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username: username,
        password: password,
      });
      console.log(response.data.message); // Display success message
      localStorage.setItem("token", response.data.token); // Store the token
      navigate("/usercourses"); // Navigate to the options page
    } catch (error) {
      newmessage("Innavlid Credential")
      sethidden("");
      console.error("Error logging in:", error.response.data.message);
      // Display error message or perform error handling
    }
  };

  return (
    <div>
      <UseLoginAppBar/>
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

        Login  As a User

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
      <button onClick={handleLogin} style={{ width: "100%",
       padding: "10px",
        backgroundColor: "#4caf50",
         color: "white", 
         border: "none", 
         borderRadius: "5px",
          cursor: "pointer" }}>Login</button>
      <br />
     <span>Not a admin? <a href="/useregister">Register</a></span> 

     <Stack spacing={0} sx={{ width: '100%' } }style={{visibility:hidden}}>

      <Alert severity="error">{message}</Alert>
      
    </Stack>
</div>
  </div>
  </div>
  );
}

export default UserLogin;
