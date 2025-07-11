import { format } from "date-fns";

const AnnouncementCard = ({ announcement }) => {
  if (!announcement || !announcement.title) return null;

  const formattedDateTime = format(
    new Date(announcement.postedAt),
    "h:mm a · MMMM d, yyyy"
  );

  return (
    <div className="relative bg-base-200 rounded-xl md:px-10 px-5 md:py-15 py-7 shadow-xs border border-base-300">
      {/* Ping animation element - only show if isLatest prop is true */}
      {announcement.isLatest && (
        <div className="absolute -right-1 -top-1 flex h-4 w-4 md:h-5 md:w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 bg-emerald-500"></span>
        </div>
      )}

      <h2 className="text-4xl font-bold mb-10 text-base-content">
        {announcement.isLatest ? "Latest Announcement" : "Announcements"}
      </h2>

      <div className="space-y-3">
        {/* Author Info */}
        {announcement.author && (
          <div className="flex items-center gap-4 mb-5">
            <img
              src={announcement.author.image}
              alt={announcement.author.name || "Author"}
              className="w-12 h-12 rounded-full object-cover border-2 border-base-content"
            />
            <div>
              <p className="font-semibold text-base-content">
                {announcement.author.name}
              </p>
              <p className="text-xs text-base-content/70">
                Posted at {formattedDateTime}
              </p>
            </div>
          </div>
        )}

        {/* Title & Message */}
        <div>
          <h3 className="text-xl font-semibold text-base-content mb-1">
            {announcement.title}
          </h3>
          <p className="text-base text-base-content">{announcement.message}</p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
