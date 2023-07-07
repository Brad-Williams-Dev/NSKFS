import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

import { getAuth } from "firebase/auth";

import { useNavigate } from "react-router";
import "./NavBar.css";

const pages = ["Home", "Events", "Rules", "Sponsors", "Contact"];
const settings = ["Profile", "Logout"];

const NavBar = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState(null);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null); // Add profilePicture state

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    navigate("/");
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    navigate("/profile");
  };

  const handleEvents = () => {
    handleCloseUserMenu();
    navigate("/events");
  };

  React.useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserData(user);
    }
  }, []);

  const getUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && user.profilePicture) {
      setProfilePicture(user.profilePicture);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#555" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="../images/nskfsLogo.png" // Replace with the path to your new logo image
            alt="Logo"
            style={{
              marginRight: 10,
              marginLeft: -10,
              height: "100px",
            }} // Adjust the styling as desired
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "grey.900",
              textDecoration: "none",
            }}
          >
            NSKFS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  className="menuitem"
                  component={Link}
                  to={page === "Events" ? "/events" : `/${page.toLowerCase()}`}
                >
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "none", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "grey.900",
              textDecoration: "none",
            }}
          >
            NSKFS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={page === "Events" ? "/events" : `/${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 8,
                  color: "white",
                  fontWeight: 500,
                  fontSize: "1rem",
                  ":hover": {
                    color: "yellow",
                  },
                  display: { xs: "none", md: "flex" },
                  ml: 20,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {profilePicture ? ( // Conditionally render the Avatar if profilePicture exists
                  <Avatar
                    alt="Profile Picture"
                    src={props.userInfo.profilePicture}
                  />
                ) : (
                  <AdbIcon /> // Placeholder icon if profilePicture is not available
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                if (setting === "Logout") {
                  return (
                    <MenuItem key={setting} onClick={handleLogout}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
                if (setting === "Profile") {
                  return (
                    <MenuItem key={setting} onClick={handleProfile}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }

                return (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
