import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { fetchAnnouncements } from "../../Hoocks/Api";

const NotificationButton = () => {
  const [announcementCount, setAnnouncementCount] = useState(0);

  const { data: announcements, isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });

  useEffect(() => {
    if (announcements) {
      setAnnouncementCount(announcements.length);
    }
  }, [announcements]);

  return (
    <div className="relative">
      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          ` p-2 rounded-full text-lg font-medium flex items-center transition-all duration-200 ${
            isActive
              ? "bg-base-content text-base-100"
              : "hover:bg-base-content hover:text-base-100"
          }`
        }
      >
        {({ isActive }) =>
          isActive ? (
            <IoMdNotifications className="text-2xl" />
          ) : (
            <IoMdNotificationsOutline className="text-2xl" />
          )
        }
      </NavLink>

      {/* Badge */}
      {!isLoading && announcementCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none shadow-sm">
          {announcementCount}
        </span>
      )}
    </div>
  );
};

export default NotificationButton;
