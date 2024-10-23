// import React from "react";
import Navbar from "../../../Shared/Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";

export default function MasterLayout() {
  return (
    <Box>
      <Navbar />
      <Box sx={{ mx: "30px", mt: "90px" }}>
        <Outlet />
      </Box>
      <Box sx={{direction:"ltr"}}>
        <Footer/>
      </Box>
    </Box>
  );
}
