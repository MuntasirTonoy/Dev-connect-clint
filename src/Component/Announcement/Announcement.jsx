import React from "react";

// Dummy announcements with author data
const announcements = [
  {
    title: "New features and updates",
    message:
      "Check out the latest improvements and changes to the platform. Go check it out!",
    postedAt: "2025-07-09T10:30:00Z",
    author: {
      name: "John Developer",
      image: "https://i.pravatar.cc/100?img=5", // Replace with real image
    },
  },
  {
    title: "Community Meetup",
    message:
      "Join our virtual meetup on Friday at 7PM (GMT+6). There will be some important guests.",
    postedAt: "2025-07-07T18:00:00Z",
    author: {
      name: "Muntasir Tonoy",
      image: "https://i.pravatar.cc/100?img=15",
    },
  },
];

const Announcement = () => {
  if (!announcements || announcements.length === 0) return null;

  // Sort announcements by latest date
  const sorted = [...announcements].sort(
    (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
  );

  const latest = sorted[0];
  const formattedDate = new Date(latest.postedAt).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <section className="py-10 bg-base-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-base-200 rounded-xl p-6 shadow-xs border border-base-300">
          {/* Section Title */}
          <h2 className="text-3xl font-bold mb-8 text-base-content">
            Announcements
          </h2>

          {/* Announcement Card */}
          <div className="space-y-3">
            {/* Author Info */}
            <div className="flex items-center gap-4">
              <img
                src={latest.author.image}
                alt={latest.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-base-content"
              />
              <div>
                <p className="font-semibold text-base-content">
                  {latest.author.name}
                </p>
                <p className="text-xs text-base-content/70">
                  Posted on {formattedDate}
                </p>
              </div>
            </div>

            {/* Title and Message */}
            <div>
              <h3 className="text-xl font-semibold text-base-content mb-1">
                {latest.title}
              </h3>
              <p className="text-base text-base-content">{latest.message}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcement;
