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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";
import LoadingPage from "../../../LoadingPage/LoadingPage";
// import { Delete, Edit } from "@mui/icons-material";

export default function Profile() {
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const userTrue = useContext(AuthContext);
  const userid = userTrue?.userData?.id;
  const role = userTrue?.userData?.role;
  const tree = role == "admin" || userid == id;
  console.log(userTrue);

  const fire = (id) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await delete_Prop(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const delete_Prop = async (id) => {
    let response = await axios.delete(
      `https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/property/${id}`,
      {
        headers: {
          token: token,
        },
      }
    );
    console.log(response);
    getUser();
  };
  const getUser = async () => {
    setLoad(true);
    try {
      let response = await axios.get(
        `https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/user/${id}`
      );
      console.log(response);
      setPosts(response.data.user.posts);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getUser();
    window.scrollTo(0, 20);
  }, [id]);
  return (
    <Box sx={{ flexGrow: 1, p: 3, direction: "rtl" }}>
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
            {tree ? user.phone : "01125683265"}
          </Button>
        </Grid>
      </Grid>
      {load ? (
        <LoadingPage />
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <>
              <Grid item xs={12} md={6} key={post._id}>
                <Card
                  sx={{
                    position: "relative",
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={post?.images[0]?.url}
                    alt="Card image cap"
                    onClick={() => navigate(`/${post._id}`)}
                    sx={{
                      height: { xs: 200, md: 250 }, // لضبط الارتفاع حسب الشاشة
                      objectFit: "cover", // لجعل الصورة تظهر بالكامل مع الحفاظ على النسبة
                    }}
                  />
                  <CardContent onClick={() => navigate(`/${post._id}`)}>
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
                            {post.area}{" "}
                            <i className="fa-solid fa-house mx-2"></i>
                          </td>
                          <td>
                            {post.location}{" "}
                            <i className="fa-solid fa-location-dot mx-2"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "10px 0px",
                      padding: "15px",
                    }}
                  >
                    <Typography variant="h6" mt={2}>
                      {post.price} جنيه
                    </Typography>
                    {tree ? (
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className="btn btn-danger"
                          onClick={() => fire(post._id)}
                        >
                          Delete
                        </button>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      )}
    </Box>
  );
}
