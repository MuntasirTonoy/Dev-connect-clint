import React from "react";
import Banner from "../../Component/Banner/Banner";
import Announcement from "../../Component/Announcement/Announcement";
import Posts from "../../Component/Posts/Posts";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Announcement />
      <Posts />
    </div>
  );
};

export default HomePage;
