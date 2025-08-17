import React from "react";
import Announcements from "../Announcement/Announcements";
import { Helmet } from "react-helmet-async";

const Notifications = () => {
  return (
    <div>
      <Helmet>
        <title>Notifications</title>
      </Helmet>
      <div className="my-20">
        <Announcements />
      </div>
    </div>
  );
};

export default Notifications;
