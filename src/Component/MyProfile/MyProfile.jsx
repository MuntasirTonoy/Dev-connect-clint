import React, { useContext } from "react";

import { HiBadgeCheck } from "react-icons/hi";
import { DashboardContext } from "../../Pages/DashBoard/DashBoard";

const MyProfile = () => {
  const { posts, userInfo } = useContext(DashboardContext);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className=" bg-base-200 flex p-10 md:p-20 md:gap-20 justify-center md:justify-start gap-15 flex-wrap  text-base-content"
    >
      <div>
        <div className="flex flex-col items-center gap-2">
          <img
            src={userInfo?.photoURL || "https://via.placeholder.com/150"}
            alt="user"
            className="w-16 h-16 rounded-full"
          />
          <h2 className="text-xl flex gap-1 items-center font-bold">
            {userInfo?.name}
            <span className="pt-1 rounded-full">
              <HiBadgeCheck />
            </span>
          </h2>
          <p className="text-sm bg-base-300 px-3 py-2 rounded-full">
            {userInfo?.email}
          </p>
          <div className="flex flex-col items-start text-sm mt-3">
            <p className="">Role: {userInfo?.role}</p>
            <p className="">Payment Status: {userInfo?.paymentStatus}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex justify-center items-center gap-4 mt-2 md:mt-10">
          {userInfo?.paymentStatus === "paid" && (
            <span className="bg-yellow-400/30 p-3 rounded-full text-xl font-medium">
              🥇
            </span>
          )}
          <span className="bg-gray-600/30 text-white p-3 rounded-full text-xl font-medium">
            🥉
          </span>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-3xl font-bold mb-2">Recent Posts</h3>
        {posts.length > 0 ? (
          <ul className="list-disc pl-5">
            {posts.slice(0, 5).map((post) => (
              <li key={post._id} className="text-sm mb-1">
                {post.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">No recent posts found.</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
