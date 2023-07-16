import  React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

 function ButtonAppBar() {
  const navigate=useNavigate();
     
  function Homes(){
    localStorage.setItem("token", null);
    navigate("/");
  }

  function Logout(){
    localStorage.setItem("token", null);
    navigate("/login");
  }

  function Createcourse(){
    navigate("/create");
  }
  function Updatecourse(){
    navigate("/update");
  }
  return (
    
    <Box style={{ display: "flex", justifyContent: "flex-end" }}>
  <AppBar position="static">
    <Toolbar>
      <div style={{ marginLeft: "auto" }}>
      <Button color="inherit" onClick={Homes}>Home</Button>
        <Button color="inherit" onClick={Createcourse}>Create</Button>
        <Button color="inherit" onClick={Updatecourse}>Update</Button>

        <Button color="inherit" onClick={Logout}>Logout</Button>
      </div>
    </Toolbar>
  </AppBar>
</Box>

    
  );
}

export default ButtonAppBar;