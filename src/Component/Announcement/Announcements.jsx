import { useQuery } from "@tanstack/react-query";
import AnnouncementCard from "./AnnouncementCard";
import { fetchAnnouncements } from "../../Hoocks/Api";
import Loading from "../Loading/Loading";

const Announcements = () => {
  const {
    data: announcements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading announcements</div>;
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
            key={announcement.id || index}
            announcement={{ ...announcement, isLatest: false }}
          />
        ))}
      </div>
    </section>
  );
};

export default Announcements;
