import { Typography } from "@mui/material";
import nodata from "../../../../assets/img/nodata.png";
export default function Nodata() {
  return (
    <div className="w-50 w-auto">
      <img src={nodata} className="w-100 my-3" style={{height:"350px"}} />
      <Typography variant="h3" color="primary" className="text-center">
        انتهت حميع العقارات المعروضه برجاء العوده مره اخرى الى الوحدات السابقه 
      </Typography>
    </div>
  );
}
