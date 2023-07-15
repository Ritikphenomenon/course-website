import  React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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

  function Options(){
    navigate("/options");
  }
  return (
    
    <Box style={{ display: "flex", justifyContent: "flex-end" }}>
  <AppBar position="static">
    <Toolbar>
      <div style={{ marginLeft: "auto" }}>
      <Button color="inherit" onClick={Homes}>Home</Button>
        <Button color="inherit" onClick={Options}>Option</Button>
        <Button color="inherit" onClick={Logout}>Logout</Button>
      </div>
    </Toolbar>
  </AppBar>
</Box>

    
  );
}

export default ButtonAppBar;