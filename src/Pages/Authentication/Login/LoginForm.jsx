import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Firebase/AuthContext";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const { googleLogin } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle login
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 animate-fade-in p-10 "
    >
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
      <button className="btn  bg-black text-base-100 w-full" type="submit">
        Login
      </button>
      <div className="divider">OR</div>
      <button type="button" className="btn btn-outline w-full">
        <FcGoogle /> Continue with Google
      </button>
    </form>
  );
};

export default LoginForm;
