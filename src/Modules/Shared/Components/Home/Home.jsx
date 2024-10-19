import { Grid, Card, CardMedia, CardContent, Typography, Button, IconButton, Table, TableBody, TableRow, TableCell } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import img from "../../../../assets/img/image.jpg"; // يمكنك استخدام الصورة الخاصة بك هنا
import { useNavigate } from "react-router-dom";

export default function CardComponent() {
  // nav
  const nav =useNavigate()
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Card 
          sx={{ 
            position: 'relative', 
            boxShadow: 3, 
            borderRadius: 2,
            overflow: 'hidden',
            cursor:"pointer",
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.03)',
            },
          }}
          onClick={()=>nav("/card")}
        >
          <CardMedia 
            component="img" 
            height="200" 
            image={img} 
            alt="Card image" 
            sx={{ objectFit: 'cover' }} // يضمن الحفاظ على النسب أثناء تغيير الحجم
          />
          <IconButton 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              left: 10, 
              color: "white", 
              backgroundColor: "rgba(0, 0, 0, 0.5)" 
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <Button 
            variant="contained" 
            color="success" 
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            للايجار
          </Button>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'right', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              شقه سكنيه 150 متر للبيع كاش بمحافظه المنيا
            </Typography>
            <Table size="small" sx={{ width: '100%', tableLayout: 'fixed' }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderBottom: "none", textAlign: 'center' }}>الموقع</TableCell>
                  <TableCell sx={{ borderBottom: "none", textAlign: 'center' }}>المساحه</TableCell>
                  <TableCell sx={{ borderBottom: "none", textAlign: 'center' }}>عدد الغرف</TableCell>
                  <TableCell sx={{ borderBottom: "none", textAlign: 'center' }}>عدد الحمامات</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderBottom: "none", textAlign: 'center' }}>
                    <i className="fa-solid fa-location-dot mx-2"></i> العدوه
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none", textAlign: 'center' }}>
                    <i className="fa-solid fa-house mx-2"></i> 180 م²
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none", textAlign: 'center' }}>
                    <i className="fa-solid fa-bed mx-2"></i> 2
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none", textAlign: 'center' }}>
                    <i className="fa-solid fa-bath mx-2"></i> 3
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="h5" sx={{ textAlign: 'right', color: "dark", marginTop: 2, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
              3,600,800 جنيه
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* يمكنك إضافة المزيد من البطاقات بنفس الطريقة */}
    </Grid>
  );
}
