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

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [anchorElWidgets, setAnchorElWidgets] = useState(null);
  const [anchorElForms, setAnchorElForms] = useState(null);
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1E1E2F" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {username}! 🎉
          </Typography>

          <Button
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={(e) => setAnchorElWidgets(e.currentTarget)}
          >
            Widgets
          </Button>
          {/* Widgets ke liye menu */}
          <Menu
            anchorEl={anchorElWidgets}
            open={Boolean(anchorElWidgets)}
            onClose={() => setAnchorElWidgets(null)}
          >
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
          <Menu
            anchorEl={anchorElForms}
            open={Boolean(anchorElForms)}
            onClose={() => setAnchorElForms(null)}
          >
            <MenuItem onClick={() => navigate("/formFunc")}>Functional Form</MenuItem>
            <MenuItem onClick={() => navigate("/formClass")}>Class Form</MenuItem>
          </Menu>

          <Button color="inherit" onClick={() => navigate("/changePassword")}>
            Manage Record
          </Button>

          <IconButton
            color="inherit"
            onClick={(e) => setAnchorElProfile(e.currentTarget)}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={() => setAnchorElProfile(null)}
          >
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
