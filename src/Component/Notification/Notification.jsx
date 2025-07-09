import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsNone } from "react-icons/md";

const Notification = () => {
  const [announcementCount, setAnnouncementCount] = useState(0);

  useEffect(() => {
    axios.get("/announcement.json").then((res) => {
      setAnnouncementCount(res.data.length);
    });
  }, []);

  return (
    <div className="relative">
      <NavLink
        to="/e"
        className={({ isActive }) =>
          `p-2 rounded-full text-md font-medium hover:bg-base-content hover:text-base-100 flex items-center ${
            isActive ? "active" : ""
          }`
        }
      >
        {({ isActive }) =>
          isActive ? (
            <IoMdNotificationsOutline className="text-2xl" />
          ) : (
            <MdOutlineNotificationsNone className="text-2xl" />
          )
        }
      </NavLink>

      {/* Badge */}
      {announcementCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {announcementCount}
        </span>
      )}
    </div>
  );
};

export default Notification;
