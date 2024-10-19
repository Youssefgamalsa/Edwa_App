import { Button, TextField, Typography } from "@mui/material";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ADDMODULE_URL } from "../../Api/Api";  // رابط الـ API

export default function AddLand() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // الحصول على التوكن
  const token = localStorage.getItem("token");

  // إرسال البيانات إلى الخادم
  const submit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("status", data.status);
    formData.append("price", data.price);
    formData.append("area", data.area);
    formData.append("bedrooms", data.bedrooms);
    formData.append("bathrooms", data.bathrooms);
    formData.append("images", data.images[0]);

    try {
      const response = await axios.post(ADDMODULE_URL.build, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        width: "85%",
        margin: "auto",
        textAlign: "right",
        direction: "rtl",
        paddingTop: "20px",
      }}
    >
      <Typography
        variant="h4"
        className="text-muted text-center"
        gutterBottom
      >
        اضافة ارض
      </Typography>

      <div className="row">
        <form
          className="shadow-lg col-lg-9 m-auto p-4 bg-light rounded"
          onSubmit={handleSubmit(submit)}
        >
          <div className="form-group mb-3">
            <Typography variant="subtitle1" className="  my-2" gutterBottom>
              * السعر بالجنية
            </Typography>
            <TextField
              {...register("price", { required: true })}
              type="text"
              id="price"
              fullWidth
              variant="outlined"
              style={{ backgroundColor: "#f0f4ff" }}
              placeholder="0 جنيه"
            />
            {errors.price && <p className="text-danger">السعر مطلوب</p>}
          </div>

          <div className="d-flex align-items-center my-2">
            <TextField
              {...register("area", { required: true })}
              id="area"
              label="المساحه بالمتر"
              variant="outlined"
              fullWidth
              className="mx-2"
              style={{ backgroundColor: "#f0f4ff" }}
              placeholder="المساحه بالمتر"
            />
          </div>
          {errors.area && <p className="text-danger">المساحة مطلوبة</p>}

          <div className="form-group mb-3">
            <Typography variant="subtitle1" className="  my-2" gutterBottom>
              العنوان بالتفصيل
            </Typography>
            <TextField
              {...register("address", { required: true })}
              id="address"
              type="text"
              fullWidth
              variant="outlined"
              style={{ backgroundColor: "#f0f4ff" }}
              placeholder="العنوان بالتفصيل"
            />
            {errors.address && <p className="text-danger">العنوان مطلوب</p>}
          </div>

          <div className="form-group mb-3">
            <Typography variant="subtitle1" className="  mb-2" gutterBottom>
              * اضافه وصف لقطعه الارض
            </Typography>
            <TextField
              {...register("description", { required: true })}
              id="description"
              multiline
              rows={5}
              fullWidth
              variant="outlined"
              style={{ backgroundColor: "#f0f4ff" }}
              placeholder="مثال ( قطعه ارض مساحته 220متر شارع بورسعيد بجوار سوبرماركت .....مربعه الشكل واجهه 12 متر  بحرى )"
            />
            {errors.description && <p className="text-danger">الوصف مطلوب</p>}
          </div>

          <Form.Group controlId="formFile" className="my-4" style={{ position: "relative" }}>
            <Typography variant="h6" className="  mb-3">
              اضافة صوره رئيسيه للعقار
            </Typography>
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
                fontSize: "18px",
              }}
            >
              <Typography variant="h5" className=" ">
                Add Image
              </Typography>
              <Form.Control
                {...register("images", { required: true })}
                type="file"
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
            {errors.images && <p className="text-danger">الصورة مطلوبة</p>}
          </Form.Group>

          <div
            className="btns mt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Button variant="outlined" className="mx-3" type="submit">
              Create
            </Button>
            <Button variant="contained" color="error" className="mx-3">
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
