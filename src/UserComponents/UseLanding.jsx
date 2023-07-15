
// import React from "react";

// /// This is the landing page. You need to add a link to the login page here.
// /// Maybe also check from the backend if the user is already logged in and then show them a logout button
// /// Logging a user out is as simple as deleting the token from the local storage.
// function UserLanding() {
//     return <div>
//         <h1>Welcome to course selling website!</h1>
//         <a href="/useregister">Register</a>
//         <br/>
//         <a href="/userlogin">Login</a>
//     </div>
// }

// export default UserLanding;

import React from "react";
import { Button} from '@mui/material';

const UserLanding = () => {
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
      <h1>Welcome to the Course Purchasing Website as a User!</h1>
      <h3>Explore our wide range of courses and enhance your knowledge.</h3>
      <h3>As an User, you have the power to purchase and explore educational content.</h3>
      <h3>As an user, you have the power to shape the educational experience and drive career growth. </h3>
      <Button variant="contained" href="/useregister">
           Register
          </Button>
          <br></br>
          <Button variant="contained" href="/userlogin">
                 Login
            </Button>
    </div>
  );
};

export default UserLanding;
