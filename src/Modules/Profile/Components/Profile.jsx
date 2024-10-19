import React from 'react';
import profile_img from "../../../assets/img/Avatar Image (2).png";
import img2 from "../../../assets/img/image.jpg";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardMedia, CardContent, Typography, Button, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 3, direction: 'rtl' }}> {/* تم إضافة direction: 'rtl' لدعم الاتجاه من اليمين إلى اليسار */}
      {/* Profile Header */}
      <Grid container spacing={3} justifyContent="center" alignItems="center" textAlign="center" mb={4}>
        <Grid item xs={12}>
          <img
            src={profile_img}
            alt="profile_img"
            style={{ width: "80px", borderRadius: "50%", marginTop: "20px" }}
          />
          <Typography variant="h6" mt={3}>
            Youssef Gamal Saleh
          </Typography>
          <Button variant="outlined" color="error" sx={{ mt: 2 }}>
            01125683265
          </Button>
        </Grid>
      </Grid>

      {/* Cards Section */}
      <Grid container spacing={3}>
        {/* First Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ position: 'relative', height: '100%' }} onClick={() => navigate("/card")}>
            <CardMedia
              component="img"
              image={img2}
              alt="Card image cap"
              sx={{
                height: { xs: 200, md: 250 }, // لضبط الارتفاع حسب الشاشة
                objectFit: 'cover',           // لجعل الصورة تظهر بالكامل مع الحفاظ على النسبة
              }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                شقه سكنيه 150 متر للبيع كاش بمحافظه المنيا
              </Typography>
              <table style={{ width: '100%', marginTop: '16px' }}>
                <tbody>
                  <tr>
                    <td>عدد الحمامات</td>
                    <td>عدد الغرف</td>
                    <td>المساحه</td>
                    <td>الموقع</td>
                  </tr>
                  <tr>
                    <td>3 <i className="fa-solid fa-city mx-2"></i></td>
                    <td>2 <i className="fa-solid fa-bed mx-2"></i></td>
                    <td>180 <i className="fa-solid fa-house mx-2"></i></td>
                    <td>العدوه <i className="fa-solid fa-location-dot mx-2"></i></td>
                  </tr>
                </tbody>
              </table>
              <Typography variant="h6" mt={2}>
                3,600,800 جنيه
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ position: 'relative', height: '100%' }} onClick={() => navigate("/card")}>
            <CardMedia
              component="img"
              image={img2}
              alt="Card image cap"
              sx={{
                height: { xs: 200, md: 250 }, // لضبط الارتفاع حسب الشاشة
                objectFit: 'cover',           // لجعل الصورة تظهر بالكامل مع الحفاظ على النسبة
              }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                شقه سكنيه 150 متر للبيع كاش بمحافظه المنيا
              </Typography>
              <table style={{ width: '100%', marginTop: '16px' }}>
                <tbody>
                  <tr>
                    <td>عدد الحمامات</td>
                    <td>عدد الغرف</td>
                    <td>المساحه</td>
                    <td>الموقع</td>
                  </tr>
                  <tr>
                    <td>3 <i className="fa-solid fa-city mx-2"></i></td>
                    <td>2 <i className="fa-solid fa-bed mx-2"></i></td>
                    <td>180 <i className="fa-solid fa-house mx-2"></i></td>
                    <td>العدوه <i className="fa-solid fa-location-dot mx-2"></i></td>
                  </tr>
                </tbody>
              </table>
              <Typography variant="h6" mt={2}>
                3,600,800 جنيه
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
