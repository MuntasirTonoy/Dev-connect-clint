import React from "react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="bg-white shadow-xs border-1  border-neutral/50   rounded-xl p-8 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center text-base-content">
          Reset Password
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full mb-4"
        />
        <button className="btn btn-neutral w-full">Send Reset Link</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
