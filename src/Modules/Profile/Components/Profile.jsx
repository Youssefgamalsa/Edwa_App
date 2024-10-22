import profile_img from "../../../assets/img/user-placeholder.png";
// import img2 from "../../../assets/img/user-placeholder.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();

  const getUser = async () => {
    try {
      let response = await axios.get(
        `https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/user/${id}`
      );
      console.log(response);
      setPosts(response.data.user.posts);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, p: 3, direction: "rtl" }}>
      {" "}
      {/* تم إضافة direction: 'rtl' لدعم الاتجاه من اليمين إلى اليسار */}
      {/* Profile Header */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        mb={4}
      >
        <Grid item xs={12}>
          <img
            src={profile_img}
            alt="profile_img"
            style={{ width: "80px", borderRadius: "50%", marginTop: "20px" }}
          />
          <Typography variant="h6" mt={3}>
            {user.firstName} {user.lastName}
          </Typography>
          <Button variant="outlined" color="error" sx={{ mt: 2 }}>
            {user.phone}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <>
            <Grid item xs={12} md={6}>
              <Card
                sx={{ position: "relative", height: "100%" }}
                onClick={() => navigate(`/${post._id}`)}
              >
                <CardMedia
                  component="img"
                  image={post.images[0].url}
                  alt="Card image cap"
                  sx={{
                    height: { xs: 200, md: 250 }, // لضبط الارتفاع حسب الشاشة
                    objectFit: "cover", // لجعل الصورة تظهر بالكامل مع الحفاظ على النسبة
                  }}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <table style={{ width: "100%", marginTop: "16px" }}>
                    <tbody>
                      <tr>
                        <td>عدد الحمامات</td>
                        <td>عدد الغرف</td>
                        <td>المساحه</td>
                        <td>الموقع</td>
                      </tr>
                      <tr>
                        <td>
                          {post.bathrooms}{" "}
                          <i className="fa-solid fa-city mx-2"></i>
                        </td>
                        <td>
                          {post.bedrooms}{" "}
                          <i className="fa-solid fa-bed mx-2"></i>
                        </td>
                        <td>
                          {post.area} <i className="fa-solid fa-house mx-2"></i>
                        </td>
                        <td>
                          {post.location}{" "}
                          <i className="fa-solid fa-location-dot mx-2"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Typography variant="h6" mt={2}>
                    {post.price} جنيه
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  );
}
