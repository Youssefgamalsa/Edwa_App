import {
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ADDMODULE_URL } from "../../Api/Api"; // افترض وجود رابط API صحيح

export default function ShowAqar() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // الحصول على التوكن
  const token = localStorage.getItem("token");

  // إرسال البيانات إلى الخادم
  const submit = async (data) => {
    try {
      const response = await axios.post(ADDMODULE_URL.build, data, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        textAlign: "right",
        direction: "rtl",
        bgcolor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3}>
        اضافة العقار
      </Typography>

      <form className="shadow col-lg-9 m-auto p-4" onSubmit={handleSubmit(submit)}>
        {/* السعر */}
        <Box mb={3}>
          <TextField
            id="price"
            label="السعر"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="جنيه"
            {...register("price", { required: "السعر مطلوب" })}
            error={!!errors.price}
            helperText={errors.price ? errors.price.message : ""}
            sx={{ bgcolor: "#f0f4ff" }}
          />
        </Box>

        {/* المساحة وسعر المتر */}
        <Box display="flex" justifyContent="space-between" mb={3}>
          <TextField
            id="area"
            label="المساحة بالمتر"
            variant="outlined"
            placeholder="المساحة بالمتر"
            {...register("area", { required: "المساحة مطلوبة" })}
            error={!!errors.area}
            helperText={errors.area ? errors.area.message : ""}
            sx={{ bgcolor: "#f0f4ff", width: "100%" }}
          />
        </Box>

        {/* العنوان */}
        <Box mb={3}>
          <TextField
            id="address"
            label="العنوان بالتفصيل"
            fullWidth
            variant="outlined"
            placeholder="العنوان بالتفصيل"
            {...register("address", { required: "العنوان مطلوب" })}
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ""}
            sx={{ bgcolor: "#f0f4ff" }}
          />
        </Box>

        {/* الوصف */}
        <Box mb={3}>
          <TextField
            id="description"
            label="وصف العقار"
            multiline
            rows={5}
            fullWidth
            variant="outlined"
            placeholder="وصف قطعة الأرض"
            {...register("description", { required: "الوصف مطلوب" })}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
            sx={{ bgcolor: "#f0f4ff" }}
          />
        </Box>

        {/* رفع الصورة */}
        <Box mb={4} sx={{ position: "relative" }}>
          <Typography variant="h6" color="error" mb={2}>
            إضافة صورة رئيسية للعقار
          </Typography>
          <Box
            sx={{
              padding: "10px",
              border: "2px dashed rgba(0, 128, 0, 0.5)",
              bgcolor: "rgba(240, 255, 239, 1)",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Typography variant="h5" color="primary">
              رفع صورة
            </Typography>
            <input
              type="file"
              {...register("image", { required: "الصورة مطلوبة" })}
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>

        {/* الأزرار */}
        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            // endIcon={<CreateIcon />}
            sx={{ padding: "10px 20px", borderRadius: "5px" }}
            type="submit"
          >
            إنشاء
          </Button>
          <Button
            variant="contained"
            color="error"
            // endIcon={<CloseIcon />}
            sx={{ padding: "10px 20px", borderRadius: "5px" }}
          >
            إغلاق
          </Button>
        </Box>
      </form>
    </Box>
  );
}
