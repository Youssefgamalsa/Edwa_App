import { Typography } from "@mui/material";
import nodata from "../../../../assets/img/nodata.png";
export default function Nodata() {
  return (
    <div className="w-100 m-auto text-center">
      <img
        src={nodata}
        className="w-75 my-3 m-auto"
        style={{ height: "300px" }}
      />
      <Typography variant="h3" color="primary" className="text-center overflow-hidden">
        انتهت حميع العقارات المعروضه برجاء العوده مره اخرى الى الوحدات السابقه
      </Typography>
    </div>
  );
}
