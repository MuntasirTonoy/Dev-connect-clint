import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Firebase/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import Loading from "../../../Component/Loading/Loading";

const LoginForm = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (data) => {
    setIsLoading(true); // Start loading
    try {
      const { email, password } = data;
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate(`${location?.state ? location.state : "/"}`);
    } catch (error) {
      console.error("Login error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.code === "auth/user-not-found"
            ? "No user found with this email."
            : error.code === "auth/wrong-password"
            ? "Incorrect password."
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false); // Stop loading in any case
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true); // Start loading
    try {
      await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Google Sign-in Successful",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate(`${location?.state ? location.state : "/"}`);
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: "Please try again later.",
      });
    } finally {
      setIsLoading(false); // Stop loading in any case
    }
  };

  // If loading, show the Loading component
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="animate-fade-in  p-10 space-y-10">
      <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
        {/* Email */}
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="relative">
          <input
            {...register("password", { required: "Password is required" })}
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
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Login Button */}
        <button
          className="btn bg-neutral text-white w-full"
          type="submit"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Divider */}
      <div className="divider">OR</div>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full"
        disabled={isLoading} // Disable button when loading
      >
        <FcGoogle className="text-xl mr-2" />
        {isLoading ? "Signing in..." : "Continue with Google"}
      </button>
    </div>
  );
};

export default LoginForm;
