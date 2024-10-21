// import React from "react";
import { useForm } from "react-hook-form";
import img from "../../../../assets/img/image.jpg";
import AuthComponent from "../../../Usable/Component/AuthComponent/AuthComponent";
import axios from "axios";
// import { USERS_URL } from "../../../../Api/Api";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // submit handler
  const submit = async (data) => {
    console.log(data) ; 
    try {
      const res = await axios.post("https://real-state-backend-mohamedfathy1991s-projects.vercel.app/api/auth/signin", data);
      const token = res.data.token;
      console.log(res.data.token);
      localStorage.setItem("token", token);
      toast.success("Sign in Successfully");
      nav('/');
    } catch (error) {
      toast.error(
        "Sign in Failed. Please check your credentials and try again."
      );
      console.log(error);
    }
  };

  // const handleLoginSuccess = async (credentialResponse) => {
  //   const token = credentialResponse.credential;
  //   try {
  //     const res = await axios.post(USERS_URL.login, { token });
  //     toast.success("Sign in Successfully");
  //     console.log(res);
  //   } catch (error) {
  //     toast.error("Sign in Failed. Please try again.");
  //     console.log(error);
  //   }
  // };

  // const handleLoginFailure = (error) => {
  //   toast.error("Login Failed: " + error);
  // };

  const form = () => {
    return (
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
        <div className="col-12 col-lg-11 col-xl-10">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="text-center mb-4">
              <h4 className="text-center text-md-start">Sign in</h4>
            </div>
            <div className="d-flex gap-3 flex-column">
              <GoogleLogin
                // onSuccess={handleLoginSuccess}
                // onFailure={handleLoginFailure}
                style={{ display: "inline-block" }}
              />
              <span className="ms-2 fs-6">Log in with Google</span>
            </div>
            <p className="text-center mt-4 mb-5">Or sign in with</p>

            {/* Login Form */}
            <form onSubmit={handleSubmit(submit)}>
              <div className="row gy-3 overflow-hidden">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      {...register("login", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Invalid email format",
                        },
                      })}
                      id="email"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    {errors.login && (
                      <div className="invalid-feedback">
                        {errors.login.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      id="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      {...register("remember_me")}
                      id="remember_me"
                    />
                    <label
                      className="form-check-label text-secondary"
                      htmlFor="remember_me"
                    >
                      Keep me logged in
                    </label>
                  </div>
                </div> */}
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn btn-dark btn-lg" type="submit">
                      Log in now
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="row">
              <div className="col-12">
                <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                  <a
                    href="/auth/register"
                    className="link-secondary text-decoration-none"
                  >
                    Create new account
                  </a>
                  <a
                    href="/auth/forget-password"
                    className="link-secondary text-decoration-none"
                  >
                    Forgot password
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <AuthComponent form={form()} img={img} />;
}
