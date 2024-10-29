import img from "../../../src/assets/img/user-placeholder.png";
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
import { Carousel } from "react-bootstrap";
import moment from "moment";

export default function CardFormat() {
  const { id } = useParams();
  const [userid, setUserid] = useState();
  const [prop, setProp] = useState({});
  const [images, setImages] = useState([]);
  const date = moment(prop.listedDate);
  const forma = date.format("MMMM Do YYYY, h:mm:ss a");
  const getproperty = async () => {
    try {
      let response = await axios.get(
        `https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/property/${id}`
      );

      setProp(response.data.property);
      console.log(response.data.property);
      setUserid(response.data.property.ownerId?._id);
      console.log(response.data.property?.ownerId);
      console.log(response.data.property.images);
      setImages(response.data.property.images);
    } catch (error) {
      console.log(error);
    }
  };

  const nav = useNavigate();

  useEffect(() => {
    getproperty();
    console.log(id);
    // console.log(moment(prop.listedDate, "MMMM Do YYYY, h:mm:ss a"));
    window.scrollTo(0, 20);
  }, [id]);

  return (
    <div
      className="cardDetails"
      style={{
        direction: "rtl",
        overflow: "hidden",
        backgroundColor: "#f5f5f5",
        width: "100%",
        margin: "0 auto",
        // minWidth:"480px"
      }}
    >
      <>
        <Box mb={4}>
          <Carousel
            data-bs-theme="white"
            className="w-100"
            interval={3000}
            controls={true}
            indicators={true}
          >
            {images.map((imag, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={imag.url}
                  alt={`Slide ${index + 1}`}
                  style={{
                    height: "350px",
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
            <Typography
              variant="p"
              sx={{ ml: "10px" }}
              className={
                prop.status == "rent" ? "btn btn-danger " : "btn btn-success"
              }
            >
              {prop.status == "rent" ? "للايجار" : "للبيع "}
            </Typography>
            <Typography variant="h4" sx={{ my: "10px" }}>
              {prop.title}
            </Typography>
            <Typography variant="h5" sx={{ mb: "10px" }}>
              <PlaceIcon /> {prop.location}
            </Typography>
            <Typography
              variant="h4"
              sx={{ mt: "20px" }}
              fontWeight={"700"}
              color="primary"
            >
              {prop.price} جنيه
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4} className="details">
          <Grid item lg={6} md={12} sm={12}>
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
                    <TableCell align="right">{prop.location}</TableCell>
                    <TableCell align="right">{prop.area} م²</TableCell>
                    <TableCell align="right">{prop.bedrooms}</TableCell>
                    <TableCell align="right">{prop.bathrooms}</TableCell>
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
                    <TableCell align="right">{prop.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <button className="btn btn-outline-danger my-3 mx-3">
                {prop.available == true
                  ? "لا يزال العقار متاحا "
                  : "العقار غير متاح "}
              </button>
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
                <Grid container className="my-3 mx-1">
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
                      {prop?.owner?.firstName} {prop?.owner?.lastName}
                    </Typography>
                    <Typography variant="body2">
                      تاريخ النشر: {forma}
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
                  <a
                    className="w-100 mb-3 btn btn-success"
                    href={`https://wa.me/201125683265/?text=اريد ان اعرف معلومات اكثر عن العقار `}
                  >
                    تواصل مع واتساب <WhatsApp />
                  </a>
                  {prop.ownerId ? (
                    <Link
                      className="btn btn-outline-dark w-100"
                      onClick={() => nav(`/profile/${userid}`)}
                    >
                      جميع اعلانات صاحب العقار
                    </Link>
                  ) : (
                    ""
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    </div>
  );
}
