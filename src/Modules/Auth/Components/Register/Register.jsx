// import React from "react";
import img from "../../../../assets/img/image.jpg";
import AuthComponent from "../../../Usable/Component/AuthComponent/AuthComponent";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

export default function Register() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // token
  const token = localStorage.getItem("token");

  // submit
  const submit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        "https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/auth/signup",
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res);
      toast.success("Sign Up Successfully, OTP is sent to your email check your email");
      nav("/auth/verify");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errorr);
    }
  };

  const form = () => {
    return (
      <div className="col-12 col-md-8 col-lg-6 d-flex align-items-center justify-content-center py-4 mx-auto">
        <div className="card shadow-lg w-100">
          <div className="card-body p-4">
            <div className="mb-4 text-center">
              <h3 className="text-4xl">Register A New Seller</h3>
              <p>
                If you already have an account,{" "}
                <Link className="font-bold text-decoration-none text-danger" to={"/auth/login"}>
                  Login here
                </Link>
                !
              </p>
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="row gy-2">
                {/* First Name */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      {...register("firstName", { required: "First name is required" })}
                      id="firstName"
                      placeholder="First name"
                    />
                    <label htmlFor="firstName">First name</label>
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      {...register("lastName", { required: "Last name is required" })}
                      id="lastName"
                      placeholder="Last name"
                    />
                    <label htmlFor="lastName">Last name</label>
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                  </div>
                </div>

                {/* Phone Number */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      {...register("phone", { required: "Phone number is required" })}
                      id="phonenumber"
                      placeholder="Phone number"
                    />
                    <label htmlFor="phonenumber">Phone number</label>
                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                  </div>
                </div>

                {/* Email */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                      id="email"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="email">Email</label>
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                  </div>
                </div>

                {/* Password */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^[1-9a-zA-Z]{3,10}$/,
                          message: "Password must be 3-10 characters long and include letters and numbers",
                        },
                      })}
                      id="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="password"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) => value === getValues("password") || "Passwords do not match",
                      })}
                      id="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn btn-dark btn-lg" type="submit">
                      Sign Up now
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return <AuthComponent form={form()} img={img} />;
}
