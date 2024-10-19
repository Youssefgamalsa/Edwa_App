import React from 'react';
import img from "../../../../assets/img/image.jpg";
import AuthComponent from '../../../Usable/Component/AuthComponent/AuthComponent';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { USERS_URL } from '../../../../Api/Api';

export default function Verify() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler
  const submit = async (data) => {
    try {
      const res = await axios.post(USERS_URL.verfiy, data);
      toast.success("verfiy successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed verfiy email");
    }
  };

  const form = () => {
    return (
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center py-4">
        <div className="col-12 col-lg-11 col-xl-10">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="text-center mb-4">
              <h4 className="text-start">Verify</h4>
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="row gy-3">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Invalid email format",
                        },
                      })}
                      id="email"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="email" className="form-label">Email</label>
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email.message}</div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      {...register("otp", {
                        required: "otp is required",
                      })}
                      id="otp"
                      placeholder="otp"
                    />
                    <label htmlFor="otp" className="form-label">otp</label>
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email.message}</div>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn btn-dark btn-lg" type="submit">verify Account</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AuthComponent form={form()} img={img} />
  );
}
