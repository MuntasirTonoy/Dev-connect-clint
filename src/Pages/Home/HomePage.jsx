import React from "react";
import Banner from "../../Component/Banner/Banner";
import Posts from "../../Component/Posts/Posts";
import LatestAnnouncement from "../../Component/Announcement/LatestAnnouncement";

const HomePage = () => {
  return (
    <div className="space-y-20">
      <Banner />
      <LatestAnnouncement />
      <Posts />
    </div>
  );
};

export default HomePage;
