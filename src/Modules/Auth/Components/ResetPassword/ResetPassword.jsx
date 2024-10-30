// import React from 'react';
import img from "../../../../assets/img/image.jpg";
import AuthComponent from "../../../Usable/Component/AuthComponent/AuthComponent";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { USERS_URL } from '../../../../Api/Api';
// import { Link } from 'react-router-dom';

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate()

  // Submit handler
  const submit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        `https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/auth/forgetpassword/${data.email}`,
        {
          otp: data.otp,
          newpassword: data.newpassword,
        }
      );
      toast.success("Reset Password Successfully ");
      console.log(res);
      nav('/auth/login')
    } catch (error) {
      console.error(error);
      toast.error("Failed to send password reset email");
    }
  };

  const form = () => {
    return (
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center py-4">
        <div className="col-12 col-lg-11 col-xl-10">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="text-center mb-4">
              <h4 className="text-start">Forget Password</h4>
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="row gy-3">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control "
                      {...register("otp", {
                        required: "otp is required",
                      })}
                      id="otp"
                      placeholder="otp"
                    />
                    <label htmlFor="otp" className="form-label">
                      OTP
                    </label>
                    {errors.otp && (
                      <div className="invalid-feedback">
                        {errors.otp.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control "
                      {...register("email", {
                        required: "email is required",
                      })}
                      id="email"
                      placeholder="email"
                    />
                    <label htmlFor="email" className="form-label">
                      email
                    </label>
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      {...register("newpassword", {
                        required: "newpassword is required",
                      })}
                      id="newpassword"
                      placeholder="newpassword"
                    />
                    <label htmlFor="newpassword" className="form-label">
                      New Password
                    </label>
                    {errors.newpassword && (
                      <div className="invalid-feedback">
                        {errors.newpassword.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn btn-dark btn-lg" type="submit">
                      Reset Password
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
