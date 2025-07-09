import React from "react";

// Example announcements data (you can replace this with your props or API data)
const dummyAnnouncements = [
  { id: 1, text: "lorem ", postedAt: "2025-07-08T10:00:00Z" },
  { id: 2, text: "Announcement 2", postedAt: "2025-07-09T12:00:00Z" },
  { id: 3, text: "Announcement 3", postedAt: "2025-07-09T14:00:00Z" },
];

const Announcement = ({ announcements = dummyAnnouncements }) => {
  if (!announcements || announcements.length === 0) {
    // No announcements to show
    return null;
  }

  // Sort announcements by postedAt descending (latest first)
  const latestAnnouncement = announcements
    .slice() // copy to avoid mutation
    .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))[0];

  return (
    <section className="announcement-section p-6 max-w-md mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center mb-4">
        <svg
          className="w-6 h-6 text-blue-500 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M12 12h.01"
          ></path>
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900">Announcement</h2>
      </div>
      <p className="text-gray-700 text-lg mb-3">{latestAnnouncement.text}</p>
      <div className="text-sm text-gray-500 border-t pt-2">
        <time dateTime={latestAnnouncement.postedAt} className="block">
          Posted at: {new Date(latestAnnouncement.postedAt).toUTCString()}
        </time>
      </div>
    </section>
  );
};

export default Announcement;
