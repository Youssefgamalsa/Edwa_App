import { Button, TextField, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
// import axios from "axios";
// import { ADDMODULE_URL } from "../../Api/Api"; // افترض وجود رابط API صحيح
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function ShowAqar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      nav("/auth/login");
    }
  }, [token, nav]);

  // const append_to_form_data = (data) => {
  //   let formData = new FormData();
  //   formData.append("title", data.title);
  //   formData.append("location", data.location);
  //   formData.append("price", data.price);
  //   formData.append("area", data.area);
  //   formData.append("bedrooms", data.bedrooms);
  //   formData.append("bathrooms", data.bathrooms);
  //   formData.append("type", "partment");
  //   formData.append("images", data.images);
  //   formData.append("status", data.status);
  // };

  // إرسال البيانات إلى الخادم

  const append_to_form_data = (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("area", data.area);
    formData.append("bedrooms", data.bedrooms);
    formData.append("bathrooms", data.bathrooms);
    formData.append("type", "partment");
    formData.append("status", data.status); // تأكد من إضافة status
    formData.append("description", data.description); // تأكد من إضافة description
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]); // تأكد من إضافة الصور كـ FormData
    }
    return formData; // تأكد من إرجاع formData
  };

  const submit = async (data) => {
    console.log(data);
    const form_data = append_to_form_data(data);
    // console.log(form_data);
    try {
      const response = await axios.post(
        "https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/property",
        form_data,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(token);
      nav("/");
      console.log("Response:", response);
      toast.success("Real State Created Successfully ");
    } catch (error) {
      console.error("Error:", error);
      toast.error("failed Created");
    }
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" mb={3}>
        اضافة العقار
      </Typography>
      <Box
        sx={{
          width: "100%",
          margin: "auto",
          textAlign: "right",
          direction: "rtl",
          bgcolor: "#f9f9f9",
          // padding: "20px",
          borderRadius: "8px",
        }}
      >
        <form
          className="shadow col-lg-9 m-auto p-4 col-md-12"
          onSubmit={handleSubmit(submit)}
        >
          <select
            className="form-select w-100 w-md-20 text-center text-md-left"
            style={{ width: "20%", margin: "20px auto" }}
            {...register("status")}
            defaultValue="" // استخدام defaultValue لتحديد القيمة الافتراضية
          >
            <option value="" disabled>
              نوع العقد
            </option>
            <option value="rent">ايجار</option>
            <option value="sell">للبيع</option>
          </select>
          <Box mb={3}>
            <TextField
              id="title"
              label="title"
              type="text"
              fullWidth
              variant="outlined"
              placeholder="title"
              {...register("title", { required: "Title is Required " })}
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
              sx={{ bgcolor: "#f0f4ff" }}
            />
          </Box>
          {/* السعر */}
          <Box mb={3}>
            <TextField
              id="price"
              label="السعر"
              type="text"
              fullWidth
              variant="outlined"
              placeholder=" السعر جنيه"
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
              label="المدينه "
              fullWidth
              variant="outlined"
              placeholder="المدينه "
              {...register("location", { required: "المدينه " })}
              error={!!errors.location}
              helperText={errors.location ? errors.location.message : ""}
              sx={{ bgcolor: "#f0f4ff" }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <TextField
              id="bedrooms"
              label="عدد الغرف الرءيسيه "
              variant="outlined"
              placeholder=" عدد الغرف الرءيسيه  "
              {...register("bedrooms", {
                required: "عدد الغرف الرءيسيه مطلوبة  ",
              })}
              error={!!errors.bedrooms}
              helperText={errors.bedrooms ? errors.bedrooms.message : ""}
              sx={{ bgcolor: "#f0f4ff", width: "100%" }}
            />
          </Box>{" "}
          <Box display="flex" justifyContent="space-between" mb={3}>
            <TextField
              id="bathrooms"
              label=" عدد الحمامات "
              variant="outlined"
              placeholder=" عدد الحمامات "
              {...register("bathrooms", { required: "عدد الحمامات مطلوبة" })}
              error={!!errors.bathrooms}
              helperText={errors.bathrooms ? errors.bathrooms.message : ""}
              sx={{ bgcolor: "#f0f4ff", width: "100%" }}
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
              placeholder="وصف شامل للعقار "
              {...register("description", { required: "الوصف مطلوب" })}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
              sx={{ bgcolor: "#f0f4ff" }}
            />
          </Box>
          {/* رفع الصورة */}
          <Box mb={4} sx={{ position: "relative" }}>
            <Typography variant="h6" color="error" mb={2}>
              إضافة صور رئيسية للعقار
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
                رفع صور العقار
              </Typography>
              <input
                type="file"
                multiple
                {...register("images", { required: "الصور مطلوبة" })}
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
    </>
  );
}
