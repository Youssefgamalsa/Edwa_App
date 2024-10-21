// import React from "react";
import img from "../../../src/assets/img/image.jpg";
import { Carousel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { Phone, WhatsApp } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PlaceIcon from "@mui/icons-material/Place";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CardFormat() {
  const { id } = useParams();
  const [prop, setProp] = useState([]);
  const [token] = localStorage.getItem("token");
  const getproperty = async () => {
    try {
      let response = await axios.get(
        `https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/property/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setProp(response.data.property);
      console.log(response.data.property);
    } catch (error) {
      console.log(error);
    }
  };

  const nav = useNavigate();

  useEffect(() => {
    getproperty();
    console.log(id);
  }, [id]);

  return (
    <div
      className="cardDetails"
      style={{
        direction: "rtl",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        maxWidth: "1500px", // تحديد الحد الأقصى لعرض العنصر
        margin: "0 auto", // مركزي العنصر
      }}
    >
      {prop.map((proper) => (
        <>
          <Box mb={4}>
            <Carousel
              data-bs-theme="white"
              className="w-100"
              interval={3000}
              controls={true}
              indicators={true}
            >
              {proper.images.map((imag, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={imag.url}
                    alt={`Slide ${index + 1}`}
                    style={{
                      height: "auto", // جعل الارتفاع تلقائي
                      maxHeight: "400px", // تحديد الحد الأقصى للارتفاع
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Box>
          <Box>
            <Box className="title">
              <Typography variant="p" sx={{ ml: "10px" }}>
                {proper.status == "rent" ? "للايجار" : "للبيع "}
              </Typography>
              <Typography variant="p">9 اكتوبر</Typography>
              <Typography variant="h4" sx={{ my: "10px" }}>
                {proper.title}
              </Typography>
              <Typography variant="h5" sx={{ mb: "10px" }}>
                <PlaceIcon /> {proper.location}
              </Typography>
              <Typography variant="p" sx={{ mt: "20px" }} fontWeight={"700"}>
                {proper.price} جنيه
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4} className="details">
            <Grid item lg={6} md={12}>
              <Paper
                sx={{ overflow: "hidden", margin: "20px", borderRadius: "8px" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">الموقع</TableCell>
                      <TableCell align="right">المساحة</TableCell>
                      <TableCell align="right">عدد الغرف</TableCell>
                      <TableCell align="right">عدد الحمامات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">{proper.location}</TableCell>
                      <TableCell align="right">{proper.area} م²</TableCell>
                      <TableCell align="right">3</TableCell>
                      <TableCell align="right">2</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>

              <Paper
                sx={{ overflow: "hidden", margin: "20px", borderRadius: "8px" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">الوصف</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">{proper.description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>

            <Grid item lg={6} md={12} sm={12}>
              <Card
                variant="outlined"
                style={{
                  maxWidth: "400px",
                  margin: "auto",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item md={4}>
                      <img
                        src={img}
                        className="img-fluid rounded-start"
                        alt="...منشئ"
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                        }}
                      />
                    </Grid>
                    <Grid item md={8}>
                      <Typography variant="h6">
                        {proper.owner.firstName} {proper.owner.lastName}
                      </Typography>
                      <Typography variant="body2">
                        تاريخ النشر: {proper.listedDate}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      className="w-50 mb-2"
                      fullWidth
                    >
                      01125683265 <Phone />
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      className="w-100 mb-3"
                    >
                      تواصل مع واتساب <WhatsApp />
                    </Button>
                    <Link
                      className="btn btn-outline-dark w-100"
                      onClick={() => nav("/advertiser/profile")}
                    >
                      جميع اعلانات صاحب العقار
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ))}
    </div>
  );
}
