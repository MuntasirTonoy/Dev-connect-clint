import React from "react";
import animationdata from "../../assets/Animation/error.json";
import Lottie from "lottie-react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Lottie animationData={animationdata}></Lottie>
      <Link to="/">
        <button className="btn shadow-sm">
          Goto Home <BsArrowRight />{" "}
        </button>
      </Link>
    </div>
  );
};

export default Error;
