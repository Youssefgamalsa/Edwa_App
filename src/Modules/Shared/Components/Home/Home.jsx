import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import FavoriteIcon from "@mui/icons-material/Favorite";
import img from "../../../../assets/img/image.jpg"; // يمكنك استخدام الصورة الخاصة بك هنا
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Nodata from "../Nodata/Nodata";
import LoadingPage from "../../../../LoadingPage/LoadingPage";

export default function CardComponent() {
  const { register, handleSubmit } = useForm();
  const [all_property, setAll_property] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const [load, setLoad] = useState(true);

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
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    get_all_properity(value);
  };

  const handleSearch = () => {
    get_all_properity(1);
  };

  return (
    <>
      <Box mb={4}>
        <Carousel data-bs-theme="white" className="w-100" interval={3000} controls={true} indicators={true}>
          {[...Array(3)].map((_, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={img}
                alt={`Slide ${index + 1}`}
                style={{
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Box>

      <form onSubmit={handleSubmit(handleSearch)}>
        <div className="search_bar shadow-lg d-flex flex-column flex-md-row">
          <input
            type="number"
            className="w-100 w-md-20 text-md-left p-2"
            placeholder="السعر يبدا من"
            {...register("price")}
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc",
              margin: "0.5rem 0",
            }}
          />
          <select
            className="form-select w-100 w-md-20 text-center text-md-left"
            style={{ width: "20%", margin: "0.5rem auto" }}
            defaultValue=""
            {...register("status")}
          >
            <option value="" disabled>
              نوع العقد
            </option>
            <option value="rent">ايجار</option>
            <option value="sell">للبيع</option>
          </select>
          <button
            type="submit"
            className="btn btn-outline-danger w-100 w-md-20"
            style={{ width: "20%", margin: "0.5rem auto", borderRadius: "5px" }}
          >
            بحث
          </button>
        </div>
      </form>

      <h2
        className="text-center text-primary mb-3"
        style={{ fontSize: "40px", fontWeight: "900", fontFamily: "'Roboto', sans-serif" }}
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
                    display: 'flex', // استخدام flex لجعل المحتوى يتوزع بشكل جيد
                    flexDirection: 'column', // توجيه المحتوى عموديًا
                    height: '100%', // جعل الكارد يتسع لارتفاع الحاوية
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                  onClick={() => nav(`/${prop._id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={prop.images[0]?.url || img}
                    alt="Card image"
                    sx={{
                      objectFit: "cover",
                      width: "100%", // جعل الصورة تأخذ العرض الكامل
                      flexShrink: 0, // منع الانكماش
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    color={prop.status === "sell" ? "success" : "error"}
                    sx={{ position: "absolute", top: 10, right: 10 }}
                  >
                    {prop.status === "sell" ? "للبيع" : "للايجار"}
                  </Button>
                  <CardContent sx={{ flexGrow: 1 }}> {/* استخدام flexGrow لتوزيع المساحة */}
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "right",
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      {prop.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "right",
                        fontSize: {
                          xs: "0.875rem",
                          sm: "1rem",
                          marginBottom: "30px",
                        },
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      {prop.description}
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
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            عدد الغرف
                          </TableCell>
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            عدد الحمامات
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            <i className="fa-solid fa-location-dot mx-2"></i>{" "}
                            {prop.location}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            <i className="fa-solid fa-house mx-2"></i>{" "}
                            {prop.area} م²
                          </TableCell>
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            <i className="fa-solid fa-bed mx-2"></i>{" "}
                            {prop.bedrooms}
                          </TableCell>
                          <TableCell sx={{ borderBottom: "none", textAlign: "center" }}>
                            <i className="fa-solid fa-bath mx-2"></i>{" "}
                            {prop.bathrooms}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Typography
                      variant="h5"
                      sx={{
                        textAlign: "right",
                        color: "primary",
                        marginTop: 2,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      {`${prop.price} جنيه`}
                    </Typography>
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
        <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
      </div>
    </>
  );
}
