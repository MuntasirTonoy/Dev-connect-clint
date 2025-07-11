import React from "react";
import { useQuery } from "@tanstack/react-query";

import AnnouncementCard from "./AnnouncementCard";
import { fetchAnnouncements } from "../../Hoocks/Api";
import Loading from "../Loading/Loading";

const LatestAnnouncement = () => {
  const {
    data: announcements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading announcement</div>;
  if (!announcements || announcements.length === 0) return null;

  // Sort by date and get the latest
  const latest = [...announcements].sort(
    (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
  )[0];

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="300"
      className="bg-base-100 p-3"
    >
      <div className="max-w-4xl mx-auto">
        <AnnouncementCard announcement={{ ...latest, isLatest: true }} />
      </div>
    </section>
  );
};

export default LatestAnnouncement;
