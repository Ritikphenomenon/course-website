import  React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

 function LoginAppBar() {
  const navigate=useNavigate();
 
  function Homes(){
    localStorage.setItem("token", null);
    navigate("/");
  }
 
  return (
     
    <Box style={{ display: "flex", justifyContent: "flex-end" }}>
  <AppBar position="static">
    <Toolbar>
      <div style={{ marginLeft: "auto" }}>
      <Button color="inherit" onClick={Homes}>Home</Button>
      </div>
    </Toolbar>
  </AppBar>
</Box>

  );
}

export default LoginAppBar;