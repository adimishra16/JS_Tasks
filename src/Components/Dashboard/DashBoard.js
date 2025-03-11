import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "../../Components/ThemeContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme(); 
  const [username, setUsername] = useState("");
  const [anchorElWidgets, setAnchorElWidgets] = useState(null);
  const [anchorElForms, setAnchorElForms] = useState(null);
  const [anchorElApiCalls, setAnchorElApiCalls] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUsername(loggedInUser.username);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: darkMode ? "#333" : "#f4f4f4",
        minHeight: "100vh",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: darkMode ? "#222" : "#1E1E2F" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {username}! 🎉
          </Typography>

          <Button color="inherit" onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>

          <Button
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={(e) => setAnchorElWidgets(e.currentTarget)}
          >
            Widgets
          </Button>
          <Menu anchorEl={anchorElWidgets} open={Boolean(anchorElWidgets)} onClose={() => setAnchorElWidgets(null)}>
            <MenuItem onClick={() => navigate("/stopwatch")}>Stopwatch</MenuItem>
            <MenuItem onClick={() => navigate("/counter")}>Counter</MenuItem>
            <MenuItem onClick={() => navigate("/calc")}>Calculator</MenuItem>
            <MenuItem onClick={() => navigate("/todo")}>To-Do</MenuItem>
          </Menu>

          <Button
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={(e) => setAnchorElForms(e.currentTarget)}
          >
            Forms
          </Button>
          <Menu anchorEl={anchorElForms} open={Boolean(anchorElForms)} onClose={() => setAnchorElForms(null)}>
            <MenuItem onClick={() => navigate("/formFunc")}>Functional Form</MenuItem>
            <MenuItem onClick={() => navigate("/formClass")}>Class Form</MenuItem>
          </Menu>

          <Button
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={(e) => setAnchorElApiCalls(e.currentTarget)}
          >
            API Calls
          </Button>
          <Menu anchorEl={anchorElApiCalls} open={Boolean(anchorElApiCalls)} onClose={() => setAnchorElApiCalls(null)}>
            <MenuItem onClick={() => navigate("/viewProduct")}>View Product</MenuItem>
            <MenuItem onClick={() => navigate("/Movies")}>Movies</MenuItem>
            <MenuItem onClick={() => navigate("/Crudapi")}>Crud API</MenuItem>
            <MenuItem onClick={() => navigate("/ViewUser")}>View User</MenuItem>
            <MenuItem onClick={() => navigate("/ProductCard")}>Product Card</MenuItem>
            <MenuItem onClick={() => navigate("/Dummyjson")}>Dummy JSON</MenuItem>
            <MenuItem onClick={() => navigate("/User")}>User</MenuItem>
            <MenuItem onClick={() => navigate("/StoreApi")}>Store API</MenuItem>
            <MenuItem onClick={() => navigate("/Details")}>Details</MenuItem>
          </Menu>

          <Button color="inherit" onClick={() => navigate("/changePassword")}>
            Manage Record
          </Button>

          <IconButton color="inherit" onClick={(e) => setAnchorElProfile(e.currentTarget)}>
            <AccountCircleIcon />
          </IconButton>
          <Menu anchorEl={anchorElProfile} open={Boolean(anchorElProfile)} onClose={() => setAnchorElProfile(null)}>
            <MenuItem onClick={() => navigate("/UserProfile")}>Edit Profile</MenuItem>
            <MenuItem onClick={() => navigate("/changePassword")}>Change Password</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
        You have successfully logged in.
      </Typography>
    </Box>
  );
};

export default Dashboard;
