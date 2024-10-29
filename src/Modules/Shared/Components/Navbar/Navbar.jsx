import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { AuthContext } from "../../../../context/AuthContext";
import logo from "../../../../assets/img/logon.png";

function ResponsiveAppBar() {
  const token = localStorage.getItem("token");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const user = React.useContext(AuthContext);
  const [userid, setUserid] = React.useState();
  React.useEffect(() => {
    console.log(user);
    setUserid(user?.userData?.id);
  }, [user]);

  const pages = [
    { name: "اعلن عن عقارك مجانا ", link: "/showdata" },
    token == null ? { name: "تسجيل الدخول  ", link: "/auth/login" } : "",
    // !token ? { name: "انشاء حساب جديد ", link: "auth/register" } : "",
  ];
  const settings = token
    ? [
        token ? { name: "My Profile", link: `/profile/${userid}` } : "",
        token ? { name: "Logout", link: "" } : "",
      ]
    : [!token ? { name: "انشاء حساب جديد ", link: "auth/register" } : ""];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const RemoveAccount = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to login or home page after logging out
    window.location.href = "/auth/login"; // أو الصفحة الرئيسية "/"
  };
  return (
    <AppBar
      position="static"
      sx={{
        direction: "rtl",
        backgroundColor: "white",
        color: "#007bff ",
        boxShadow: "none",
        position: "fixed",
        top: "0",
        right: "0",
        zIndex: "1000",
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
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "24px",
              letterSpacing: ".3rem",
              color: "#007bff ",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="عقار ي منيا لوجو "
              style={{ width: "100px" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              color="#007bff "
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              sx={{ direction: "rtl" }}
            >
              <Box sx={{ width: 250 }}>
                <Typography variant="h6" sx={{ padding: 2 }}>
                  القائمة
                </Typography>
                <Divider />
                <List>
                  {pages.map((page) => (
                    <ListItem
                      button
                      key={page.name}
                      component={Link}
                      to={page.link}
                    >
                      <Typography
                        sx={{ textAlign: "right", padding: 2, color: "#007bff " }}
                      >
                        {page.name}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {settings.map((setting) => (
                    <ListItem
                      button
                      key={setting.name}
                      component={Link}
                      to={setting.link}
                      onClick={
                        setting.name === "Logout"
                          ? RemoveAccount
                          : handleCloseUserMenu
                      }
                    >
                      <Typography
                        sx={{ textAlign: "right", padding: 2, color: "#007bff" }}
                      >
                        {setting.name}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "24px",
              letterSpacing: ".3rem",
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="عقار ي منيا لوجو "
              style={{ width: "100px" }}
            />
          </Typography>

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
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="فتح الإعدادات">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              {settings?.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={
                    setting.name === "Logout"
                      ? RemoveAccount
                      : handleCloseUserMenu
                  }
                  sx={{ padding: "20px" }}
                  component={Link}
                  to={setting.name === "Logout" ? "#" : setting.link}
                >
                  <Typography>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
