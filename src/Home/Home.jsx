
import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';


/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Home() {
    const navigate = useNavigate();

    const handleExploreAdmin = () => {
      navigate('/adminlanding'); 
    };

    const backgroundImages = [
        "../src/images/home_back.jpg",
      ];

      
  const getRandomBackground = () => {
    return backgroundImages[0];
  };

  
  const backgroundImage = getRandomBackground();


    
    const handleExploreUser = () => {
        navigate('/userlanding'); 
      };
  
    return <div   style={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: 20,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        

        
    }}>
       
        <Card  sx={{ maxWidth: 344,maxHeight:430,marginTop:10 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="../src/images/home_admin.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            ADMIN
          </Typography>
          <Typography variant="body2" color="text.secondary">
          As an admin, you have the authority to create and purchase courses, shaping the platform's educational offerings. You curate content, manage course creation, recruit instructors, and ensure quality. You generate revenue, support users, and drive platform growth.power to drive,excel  growth.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button onClick={handleExploreAdmin} variant="contained" disableElevation>
  Explore As admin
</Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 344 , maxHeight:430,marginTop:10}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="../src/images/home_user.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            USER
          </Typography>
          <Typography variant="body2" color="text.secondary">
          As a user, you have the power to purchase courses and explore the best learning opportunities. Choose from a wide range of subjects, learn at your own pace, and benefit from expert instructors. Expand your skills, engage in interactive learning, and continuously grow through lifelong learning.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button   onClick={handleExploreUser} variant="contained" disableElevation>
  Explore As user
</Button>
      </CardActions>
    </Card>
    
      
    </div>
}

export default Home;