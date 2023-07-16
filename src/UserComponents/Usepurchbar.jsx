import  React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

 function UsePurchaseAppBar() {
  const navigate=useNavigate();
  function Logout(){
    localStorage.setItem("token", null);
    navigate("/userlogin");
  }
  function Homes(){
    localStorage.setItem("token", null);
    navigate("/");
  }
  function ShowCourses(){
    navigate("/usercourses");
  }
  return (
     
    <Box style={{ display: "flex", justifyContent: "flex-end" }}>
  <AppBar position="static">
    <Toolbar>
      <div style={{ marginLeft: "auto" }}>
      <Button color="inherit" onClick={Homes}>Home</Button>
        <Button color="inherit" onClick={ShowCourses}>ALLCOURSES</Button>
        <Button color="inherit" onClick={Logout}>Logout</Button>
      </div>
    </Toolbar>
  </AppBar>
</Box>

  );
}

export default UsePurchaseAppBar;