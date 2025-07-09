import React from "react";
import Search from "./Search";

const Banner = () => {
  return (
    <section
      className="relative bg-cover bg-top h-[100vh] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url('https://i.ibb.co/dC31frW/Chat-GPT-Image-Jul-9-2025-10-41-09-AM.png')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-white">
        <h1 className="text-4xl md:text-5xl  font-extrabold mb-10">
          Find What You're Looking For
        </h1>
        <Search />
      </div>
    </section>
  );
};

export default Banner;
