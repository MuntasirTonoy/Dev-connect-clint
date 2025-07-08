import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Firebase/AuthContext";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle registration
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 animate-fade-in p-10 "
    >
      <input
        {...register("name")}
        type="text"
        placeholder="Full Name"
        className="input input-bordered w-full"
      />
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="input input-bordered w-full"
      />
      <button className="btn btn-neutral w-full" type="submit">
        Register
      </button>
      <div className="divider">OR</div>
      <button type="button" className="btn btn-outline w-full">
        <FcGoogle /> Continue with Google
      </button>
    </form>
  );
};

export default RegisterForm;
