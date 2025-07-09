import React, { useEffect, useState } from "react";
import axios from "axios";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get("/announcement.json")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error("Error loading announcements:", err));
  }, []);

  if (!announcements || announcements.length === 0) return null;

  const sorted = [...announcements].sort(
    (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
  );

  const latest = sorted[0];
  if (!latest || !latest.title) return null;

  const formattedDate = new Date(latest.postedAt).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <section className="bg-base-100  p-3">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base-200 rounded-xl md:px-10 px-5 md:py-15 py-7 shadow-xs border border-base-300">
          <h2 className="text-4xl font-bold mb-10 text-base-content">
            Announcements
          </h2>

          <div className="space-y-3">
            {/* Author Info */}
            {latest.author && (
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={latest.author.image}
                  alt={latest.author.name || "Author"}
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
            )}

            {/* Title & Message */}
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
