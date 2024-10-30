import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
// import img from "../../../../assets/img/image.jpg"; // يمكنك استخدام الصورة الخاصة بك هنا
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import Nodata from "../Nodata/Nodata";
import LoadingPage from "../../../../LoadingPage/LoadingPage";
import img10 from "../../../../assets/img/10.png";
import img11 from "../../../../assets/img/11.png";
import img12 from "../../../../assets/img/12.png";

export default function CardComponent() {
  const [all_property, setAll_property] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const [load, setLoad] = useState(true);
  const images = [img10, img11, img12];

  const get_all_properity = async (pages) => {
    setLoad(true);
    try {
      let response = await axios.get(
        "https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/property",
        {
          params: {
            page: pages,
          },
        }
      );
      setAll_property(response.data.property);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    get_all_properity(1);
    window.scrollTo(0, 20);
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    get_all_properity(value);
  };

  return (
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
              src={imag}
              alt={`Slide ${index + 1}`}
              style={{
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
    
    <h2
      className="text-center text-primary my-3"
      style={{
        fontSize: "45px",
        fontWeight: "900",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      جميع العقارات
    </h2>
  
    {load ? (
      <LoadingPage />
    ) : (
      <Grid container spacing={3} justifyContent="center">
        {all_property.length > 0 ? (
          all_property.map((prop) => (
            <Grid item xs={12} sm={6} md={4} key={prop._id}>
              <Card
                sx={{
                  position: "relative",
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
                onClick={() => nav(`/${prop._id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={prop.images[0]?.url || img10}
                  alt="Card image"
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    flexShrink: 0,
                  }}
                />
                <Button
                  variant="contained"
                  color={prop.status === "sell" ? "success" : "error"}
                  sx={{ position: "absolute", top: 10, right: 10 }}
                >
                  {prop.status === "sell" ? "للبيع" : "للايجار"}
                </Button>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    padding: "16px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "right",
                      fontSize: "27px",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {prop.title}
                  </Typography>
                  <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                          الموقع
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                          المساحة
                        </TableCell>
                        {prop.bedrooms !== 0 && (
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            عدد الغرف
                          </TableCell>
                        )}
                        {prop.bathrooms !== 0 && (
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            عدد الحمامات
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                          <i className="fa-solid fa-location-dot mx-2"></i> {prop.location}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                          <i className="fa-solid fa-house mx-2"></i> {prop.area} م²
                        </TableCell>
                        {prop.bedrooms !== 0 && (
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            <i className="fa-solid fa-bed mx-2"></i> {prop.bedrooms}
                          </TableCell>
                        )}
                        {prop.bathrooms !== 0 && (
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            <i className="fa-solid fa-bath mx-2"></i> {prop.bathrooms}
                          </TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Box className="d-flex justify-content-between align-items-center mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => nav(`/${prop._id}`)}
                      style={{ fontSize: "16px" }}
                    >
                      عرض التفاصيل
                    </button>
                    <Typography
                      variant="h5"
                      sx={{
                        textAlign: "right",
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                        fontFamily: "'Roboto', sans-serif",
                      }}
                      className="text-primary"
                    >
                      {`${prop.price} جنيه`}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Nodata />
        )}
      </Grid>
    )}
  
    <div
      style={{
        width: "85%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="my-3"
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </div>
  </>
  
  );
}
