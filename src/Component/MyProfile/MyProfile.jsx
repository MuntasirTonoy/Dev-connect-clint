import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const recentPosts = [
    { title: "How to learn MERN", tag: "JavaScript" },
    { title: "React Form Handling", tag: "React" },
    { title: "Node.js Tips", tag: "Backend" },
  ];

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="card bg-base-200 p-6 space-y-4 text-base-content"
    >
      <div className="flex items-center gap-4">
        <img
          src={user?.photoURL || "https://shorturl.at/WUkZ2"}
          alt="user"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.displayName}</h2>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-4 mt-4">
        <span className="bg-yellow-400 px-3 py-1 rounded text-sm font-medium">
          🥇 Gold Badge
        </span>
        <span className="bg-amber-600 text-white px-3 py-1 rounded text-sm font-medium">
          🥉 Bronze Badge
        </span>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Posts</h3>
        <ul className="space-y-1">
          {recentPosts.map((post, idx) => (
            <li key={idx} className="p-2 rounded bg-base-300 text-sm shadow">
              <strong>{post.title}</strong>{" "}
              <span className="text-gray-500">[{post.tag}]</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyProfile;
