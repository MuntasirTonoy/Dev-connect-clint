import React, { useState } from "react";
import LoginForm from "../Login/LoginForm";
import RegisterForm from "../Registration/RegisterForm";
import logo from "../../../assets/Images/logo.png";
import { Link } from "react-router"; // Make sure to use correct router if needed

const Join = () => {
  const [tab, setTab] = useState("login");

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div className="bg-white shadow-sm border-1  border-neutral/50 rounded-xl w-full max-w-md">
        {/* Branding */}
        <div className="flex items-center justify-center py-6 mb-6 space-x-2">
          <img src={logo} alt="Dev Connect Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">Dev Connect</h1>
        </div>

        {/* Custom Daisy-style Tabs */}
        <div className="flex border-b border-gray-200 ">
          <button
            onClick={() => setTab("login")}
            className={`tab tab-bordered flex-1 py-2 font-bold text-sm transition-all duration-300 ${
              tab === "login"
                ? "tab-active text-base-content bg-neutral-content border-b-2 border-neutral rounded-tr-md"
                : "text-gray-500 hover:text-base-content"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`tab tab-bordered flex-1 py-2 font-bold text-sm transition-all duration-300 ${
              tab === "register"
                ? "tab-active text-base-content bg-neutral-content border-b-2 border-neutral rounded-tl-md"
                : "text-gray-500 hover:text-base-content"
            }`}
          >
            Register
          </button>
        </div>

        {/* FIXED HEIGHT container with overlapping tab panels */}
        <div className="relative bg-neutral-content rounded-b-xl h-[480px]  pb-8 pt-4  overflow-hidden transition-all duration-300">
          {/* Login Form */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              tab === "login"
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <LoginForm />
            <div className="text-center mt-6 flex flex-col gap-2 text-sm">
              <Link
                href="/forgot-password"
                className="text-neutral font-semibold hover:underline"
              >
                Forgot password?
              </Link>
              <p>
                Don’t have an account?{" "}
                <button
                  onClick={() => setTab("register")}
                  className="text-neutral font-semibold hover:underline"
                >
                  Create one
                </button>
              </p>
            </div>
          </div>

          {/* Register Form */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              tab === "register"
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <RegisterForm />
            <div className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => setTab("login")}
                className="text-neutral font-semibold hover:underline"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
