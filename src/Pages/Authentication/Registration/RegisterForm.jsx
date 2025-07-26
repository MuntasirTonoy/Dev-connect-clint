import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Firebase/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../../../Component/Loading/Loading";

const RegisterForm = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors.name?.message) toast.error(errors.name.message);
    if (errors.email?.message) toast.error(errors.email.message);
    if (errors.password?.message) toast.error(errors.password.message);
    if (errors.image?.message) toast.error(errors.image.message);
  }, [errors]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { email, password, name, image } = data;

      const imageFile = image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      const imageUrl = res.data?.data?.url;

      await createUser(email, password, name, imageUrl);

      Swal.fire({
        icon: "success",
        title: "Registration Successful, Login now",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate(location?.state || "/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
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
      toast.error(error.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in px-10 py-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Image Upload */}
        <input
          {...register("image", { required: "Image is required" })}
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />

        {/* Full Name */}
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
            maxLength: { value: 50, message: "Maximum 50 characters" },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only letters and spaces allowed",
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
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
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
              minLength: { value: 6, message: "Minimum 6 characters" },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message: "At least one letter and one number",
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

        <button className="btn btn-neutral w-full" type="submit">
          Register
        </button>
      </form>

      <div className="divider">OR</div>

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
