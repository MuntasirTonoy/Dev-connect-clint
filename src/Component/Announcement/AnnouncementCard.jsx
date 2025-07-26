import { format } from "date-fns";
import Swal from "sweetalert2";
import { deleteAnnouncementById } from "../../Hoocks/Api";

const AnnouncementCard = ({ announcement, userInfo, refetch }) => {
  if (!announcement || !announcement.title) return null;

  const formattedDateTime = format(
    new Date(announcement.postedAt),
    "h:mm a · MMMM d, yyyy"
  );

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This announcement will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteAnnouncementById(announcement._id);
        Swal.fire("Deleted!", "The announcement has been deleted.", "success");
        refetch?.();
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error", "Could not delete the announcement.", "error");
      }
    }
  };

  return (
    <div className="relative bg-base-200 rounded-xl md:px-10 px-5 md:py-15 py-7 shadow-sm border border-base-300">
      {/* Ping animation element - only show if isLatest prop is true */}
      {announcement.isLatest && (
        <div className="absolute right-1 top-1 flex h-4 w-4 md:h-5 md:w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 bg-emerald-500"></span>
        </div>
      )}

      {/* Admin-only delete button */}
      {userInfo?.role === "admin" && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 text-error hover:text-error-content text-xl"
          title="Delete announcement"
        >
          ❌
        </button>
      )}

      <h2 className="md:text-4xl text-2xl font-bold mb-10 text-base-content">
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
                {announcement.author.name}{" "}
                <span className="text-xs text-base-content/70">
                  ({announcement.author.role})
                </span>
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
