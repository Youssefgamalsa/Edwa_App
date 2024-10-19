import { Button, TextField, Typography, Box } from "@mui/material";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ADDMODULE_URL } from "../../Api/Api";

export default function AddBuilding() {
  // إعداد النموذج باستخدام React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // الحصول على التوكن
  const token = localStorage.getItem("token");

  // إرسال البيانات إلى الخادم
  const submit = async (data) => {
    try {
      const response = await axios.post(ADDMODULE_URL.build, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "85%", margin: "auto", textAlign: "right", direction: "rtl" }}>
      <Typography variant="h4" className="text-center text-muted mb-4">اضافة منزل</Typography>

      <Box component="form" className="shadow col-lg-9 m-auto p-4" onSubmit={handleSubmit(submit)}>
        <Typography variant="h5" className="mb-4">تفاصيل المبنى </Typography>

        {/* الحقل الخاص بالمساحة */}
        <Box className="form-group mb-3">
          <label htmlFor="area" className="my-2">* المساحة بالمتر</label>
          <TextField
            id="area"
            fullWidth
            type="text"
            variant="outlined"
            placeholder="المساحة بالمتر"
            {...register("area", { required: "المساحة مطلوبة" })}
            error={!!errors.area}
            helperText={errors.area && errors.area.message}
            sx={{ backgroundColor: "#f0f4ff" }}
          />
        </Box>

        {/* الحقل الخاص بالسعر */}
        <Box className="form-group mb-3">
          <label htmlFor="price" className="my-2">* السعر بالجنيه</label>
          <TextField
            id="price"
            fullWidth
            type="text"
            variant="outlined"
            placeholder="السعر بالجنيه"
            {...register("price", { required: "السعر مطلوب" })}
            error={!!errors.price}
            helperText={errors.price && errors.price.message}
            sx={{ backgroundColor: "#f0f4ff" }}
          />
        </Box>

        {/* الحقل الخاص بالوصف */}
        <Box className="form-group mb-3">
          <label htmlFor="description" className="my-2">* وصف المبنى السكني</label>
          <TextField
            id="description"
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            placeholder="وصف تفصيلي للمبنى..."
            {...register("description", { required: "الوصف مطلوب" })}
            error={!!errors.description}
            helperText={errors.description && errors.description.message}
            sx={{ backgroundColor: "#f0f4ff" }}
          />
        </Box>

        {/* رفع صورة العقار */}
        <Form.Group controlId="formFile" className="my-4" style={{ position: "relative" }}>
          <Typography variant="h6" className="mb-3">إضافة صورة رئيسية للعقار</Typography>
          <Form.Label
            style={{
              display: "block",
              padding: "10px",
              border: "2px dashed rgba(0, 128, 0, 0.5)",
              backgroundColor: "rgba(240, 255, 239, 1)",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
              color: "#28a745",
            }}
          >
            <Typography variant="h4" >إضافة صورة</Typography>
            <Form.Control
              type="file"
              {...register("images", { required: "الصورة مطلوبة" })}
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
          </Form.Label>
        </Form.Group>

        {/* الحقول الأخرى */}
        <Box className="w-100 my-3">
          <label htmlFor="floors" className="my-2">عدد الأدوار</label>
          <TextField
            id="floors"
            fullWidth
            type="text"
            variant="outlined"
            placeholder="عدد الأدوار"
            {...register("floors", { required: "عدد الأدوار مطلوب" })}
            error={!!errors.floors}
            helperText={errors.floors && errors.floors.message}
            sx={{ backgroundColor: "#f0f4ff" }}
          />
        </Box>

        <Box className="w-100 my-3">
          <label htmlFor="bedrooms" className="my-2">عدد الغرف الرئيسية</label>
          <TextField
            id="bedrooms"
            fullWidth
            type="text"
            variant="outlined"
            placeholder="عدد الغرف الرئيسية"
            {...register("bedrooms", { required: "عدد الغرف مطلوب" })}
            error={!!errors.bedrooms}
            helperText={errors.bedrooms && errors.bedrooms.message}
            sx={{ backgroundColor: "#f0f4ff" }}
          />
        </Box>

        {/* الأزرار */}
        <Box sx={{ textAlign: "center", display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          <Button
            variant="outlined"
            type="submit"
          >
            إنشاء
          </Button>
          <Button
            variant="contained"
            color="error"
          >
            إغلاق
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
