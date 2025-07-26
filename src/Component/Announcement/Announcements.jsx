import { useQuery } from "@tanstack/react-query";
import AnnouncementCard from "./AnnouncementCard";
import Loading from "../Loading/Loading";

import { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthContext";
import { fetchAnnouncements, fetchUserByEmail } from "../../Hoocks/Api";

const Announcements = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user;

  // Fetch user info by email
  const {
    data: userInfo,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["userInfo", currentUser?.email],
    queryFn: () => fetchUserByEmail(currentUser.email),
    enabled: !!currentUser?.email,
  });

  // Fetch announcements
  const {
    data: announcements,
    isLoading: announcementsLoading,
    error: announcementsError,
    refetch,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
    enabled: !!userInfo, // wait for userInfo to load
  });

  if (userLoading || announcementsLoading) return <Loading />;
  if (userError || announcementsError) return <div>Error loading data</div>;
  if (!announcements || announcements.length === 0) return null;

  const sorted = [...announcements].sort(
    (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
  );

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="300"
      className="bg-base-100 p-3"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {sorted.map((announcement, index) => (
          <AnnouncementCard
            key={announcement._id || index}
            announcement={{ ...announcement, isLatest: index === 0 }}
            userInfo={userInfo}
            refetch={refetch}
          />
        ))}
      </div>
    </section>
  );
};

export default Announcements;
