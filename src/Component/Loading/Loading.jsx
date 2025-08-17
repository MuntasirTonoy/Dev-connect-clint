import React from "react";
import Lottie from "lottie-react";
import animation from "../../assets/Animation/loading.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-10 min-h-screen">
      <div className="w-28 h-28">
        <Lottie animationData={animation} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

export default Loading;
