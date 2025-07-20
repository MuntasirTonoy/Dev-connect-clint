import React from "react";
import Search from "../Search/Search";
const Banner = ({ searchResult, setSearchResults }) => {
  return (
    <section
      data-aos="fade-up"
      className="relative container mx-auto bg-cover bg-top h-[70vh] md:rounded-xl overflow-hidden flex items-center justify-center text-center"
      style={{
        backgroundImage: `url('https://i.ibb.co/dC31frW/Chat-GPT-Image-Jul-9-2025-10-41-09-AM.png')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10">
          Find What You're Looking For
        </h1>
        <Search
          searchResult={searchResult}
          setSearchResults={setSearchResults}
        />
      </div>
    </section>
  );
};

export default Banner;
