// import React from "react";
import Navbar from "../../../Shared/Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";

export default function MasterLayout() {
  return (
    <Box>
      <Navbar />
      <Box sx={{ mt: "90px" , mx:"10px" }}>
        <Outlet />
      </Box>
      <Box sx={{direction:"ltr"}}>
        <Footer/>
      </Box>
    </Box>
  );
}
