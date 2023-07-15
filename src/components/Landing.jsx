import React from "react";
import { Button} from '@mui/material';

const Landing = () => {
  const backgroundImages = [
    "../src/images/admin_back.png",
    
  ];

  const getRandomBackground = () => {
    return backgroundImages[0];
  };

  const backgroundImage = getRandomBackground();

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "110vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        color: "black",
        textShadow: "2px 2px 4px rgba(201, 16, 158, 0.7)",
      }}
    >
      <h1>Welcome to the Course Selling Website as a Admin!</h1>
      <h3>Explore our wide range of courses and enhance your knowledge.</h3>
      <h3>As an admin, you have the power to create, manage, and curate educational content.</h3>
      <h3>As an admin, you have the power to shape the educational experience and drive platform growth. </h3>
      <Button variant="contained" href="/register">
           Register
          </Button>
          <br></br>
          <Button variant="contained" href="/login">
                 Login
            </Button>
    </div>
  );
};

export default Landing;
