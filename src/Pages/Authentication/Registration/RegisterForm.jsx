import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Firebase/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Show toast for all field errors after render
  useEffect(() => {
    if (errors.name?.message) toast.error(errors.name.message);
    if (errors.email?.message) toast.error(errors.email.message);
    if (errors.password?.message) toast.error(errors.password.message);
  }, [errors.name, errors.email, errors.password]);

  const onSubmit = async (data) => {
    try {
      const { email, password, name } = data;
      await createUser(email, password, name);
      Swal.fire({
        icon: "success",
        title: "Registration Successful, Login now",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/join");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Signed in with Google",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="animate-fade-in p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 50,
              message: "Name must be at most 50 characters",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name must only contain letters and spaces",
            },
          })}
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
        />

        {/* Email */}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email is not valid",
            },
          })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />

        {/* Password */}
        <div className="relative">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit Button */}
        <button className="btn btn-neutral w-full" type="submit">
          Register
        </button>
      </form>

      {/* Divider */}
      <div className="divider">OR</div>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        type="button"
        className="btn btn-outline w-full"
      >
        <FcGoogle className="text-xl mr-2" />
        Continue with Google
      </button>
    </div>
  );
};

export default RegisterForm;
