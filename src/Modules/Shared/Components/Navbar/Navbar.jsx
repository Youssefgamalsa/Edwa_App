import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import logo from "../../../../assets/img/logon1.png";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../../../context/AuthContext";

const pages = [{ name: "اعلن عن عقارك", link: "/showdata" }];

function Navbar() {
  const user = React.useContext(AuthContext);
  console.log(user);
  const id = user?.userData?.id;
  // const role = user?.userData?.role;

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <AppBar
      position="static"
      sx={{
        direction: "rtl",
        backgroundColor: "white",
        color: "#000",
        boxShadow: "none",
        zIndex: 1000,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="" width={"100px"} />
          </Typography>

          {/* Drawer for small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box sx={{ width: { xs: "80vw", sm: "250px" } }}>
                <Typography variant="h6" sx={{ padding: 2 }}>
                  القائمة
                </Typography>
                <Divider />
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    component={Link}
                    to={page.link}
                    sx={{ justifyContent: "center" }}
                  >
                    <Typography
                      sx={{
                        color: "#007bff",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            </Drawer>
          </Box>

          {/* Navbar pages for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                sx={{
                  my: 2,
                  display: "block",
                  fontSize: "16px",
                  padding: "10px",
                  color: "#007bff",
                  fontWeight: "bold",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon sx={{ fontSize: "40px" }} />
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{
                mt: "15px",
                "& .MuiMenu-paper": {
                  width: "300px",
                  padding: "20px",
                },
              }}
            >
              {!isLoggedIn ? (
                <Box>
                  <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
                    تسجيل الدخول
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", mb: 2, color: "gray" }}
                  >
                    اضف اعلانات، ملاحظات، المفضلات وأكثر...
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    component={Link}
                    to="/auth/login"
                    sx={{
                      mb: 1,
                      fontSize: "16px",
                      fontWeight: "bold",
                      backgroundColor: "#007bff",
                      "&:hover": { backgroundColor: "#0056b3" },
                    }}
                  >
                    تسجيل الدخول
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    component={Link}
                    to="/auth/register"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderColor: "#007bff",
                      color: "#007bff",
                      "&:hover": { borderColor: "#0056b3", color: "#0056b3" },
                    }}
                  >
                    انشاء حساب
                  </Button>
                </Box>
              ) : (
                <Box>
                  <MenuItem
                    component={Link}
                    to={`/profile/${id}`}
                    sx={{ justifyContent: "center" }}
                  >
                    <Typography variant="body1">الملف الشخصي</Typography>
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/auth/login";
                    }}
                    sx={{ justifyContent: "center" }}
                  >
                    <Typography variant="body1" color="error">
                      تسجيل الخروج
                    </Typography>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
