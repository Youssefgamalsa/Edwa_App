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
import FavoriteIcon from "@mui/icons-material/Favorite";
import img from "../../../../assets/img/image.jpg"; // يمكنك استخدام الصورة الخاصة بك هنا
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function CardComponent() {
  // nav

  let { register, handleSubmit } = useForm();
  const [all_property, setAll_property] = useState([]);

  const nav = useNavigate();

  const get_all_properity = async (price, status) => {
    try {
      let response = await axios.get(
        "https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/property",
        {
          params: {
            "price[gt]": price,
            "status": status,
          },
        }
      );
      console.log(response);
      console.log(response.data.property);
      setAll_property(response.data.property);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_all_properity(300000, "sell");
  }, []);

  const handleSearch = (data) => {
    get_all_properity(data.price, data.status);
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
          {[...Array(3)].map((_, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={img}
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
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className="search_bar shadow-lg  d-flex flex-column flex-md-row">
          <input
            type="number"
            className="w-100 w-md-20 text-md-left p-2"
            placeholder="السعر يبدا من "
            {...register("price")}
          />
          <select
            className="form-select  w-100 w-md-20 text-center text-md-left"
            style={{ width: "20%", margin: "auto" }}
            {...register("status")}
          >
            <option selected>نوع العقد </option>
            <option value="rent"> ايجار </option>
            <option value="sell"> للبيع </option>
          </select>
          <button
            type="submit"
            className=" btn btn-outline-danger w-100 w-md-20"
            style={{ width: "20%", margin: "auto" }}
          >
            بحث
          </button>
        </div>
      </form>

      <h2
        className="text-center text-primary mb-3 "
        style={{ fontSize: "40px", fontWeight: "900 " }}
      >
        {" "}
        جميع العقارات{" "}
      </h2>
      <Grid container spacing={3} justifyContent="center">
        {all_property.map((prop) => (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  position: "relative",
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
                onClick={() => nav(`/${prop._id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={prop.images[0].url}
                  alt="Card image"
                  sx={{ objectFit: "cover" }} // يضمن الحفاظ على النسب أثناء تغيير الحجم
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
                  color={prop.status == "sell" ? "success" : "danger"}
                  sx={{ position: "absolute", top: 10, right: 10 }}
                >
                  {prop.status == "sell" ? "للبيع " : "للايجار "} 
                </Button>
                <CardContent>
                  <Typography
                    variant="h2"
                    // component="div"
                    sx={{
                      textAlign: "right",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    {prop.title}
                  </Typography>

                  <Typography
                    varient="h6"
                    sx={{
                      textAlign: "right",
                      fontSize: {
                        xs: "1rem",
                        sm: "1.25rem",
                        marginBottom: "30px",
                      },
                    }}
                  >
                    {prop.description}
                  </Typography>
                  <Table
                    size="small"
                    sx={{ width: "100%", tableLayout: "fixed" }}
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ borderBottom: "none", textAlign: "center" }}
                        >
                          الموقع
                        </TableCell>
                        <TableCell
                          sx={{ borderBottom: "none", textAlign: "center" }}
                        >
                          المساحه
                        </TableCell>
                        <TableCell
                          sx={{ borderBottom: "none", textAlign: "center" }}
                        >
                          عدد الغرف
                        </TableCell>
                        <TableCell
                          sx={{ borderBottom: "none", textAlign: "center" }}
                        >
                          عدد الحمامات
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ borderBottom: "none", textAlign: "center" }}
                        >
                          <i className="fa-solid fa-location-dot mx-2"></i>{" "}
                          {prop.location}
                        </TableCell>
                        <TableCell
                          sx={{ borderBottom: "none", textAlign: "center" }}
                        >
                          <i className="fa-solid fa-house mx-2"></i> {prop.area}{" "}
                          م²
                        </TableCell>
                        <TableCell
                          sx={{ borderBottom: "none", textAlign: "center" }}
                        >
                          <i className="fa-solid fa-bed mx-2"></i>{" "}
                          {prop.bedrooms}
                        </TableCell>
                        <TableCell
                          sx={{ borderBottom: "none", textAlign: "center" }}
                        >
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
                    }}
                  >
                    {`${prop.price} جنيه`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}
