import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthContext";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchPostsByEmail } from "../../Hoocks/Api";
import { HiBadgeCheck } from "react-icons/hi";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: () => fetchPostsByEmail(user?.email),
    enabled: !!user?.email, // only run if userEmail exists
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className=" bg-base-200 flex p-10 md:p-20 md:gap-20 justify-center md:justify-start gap-15 flex-wrap  text-base-content"
    >
      <div>
        <div className="flex items-center gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt="user"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl flex gap-1 items-center font-bold">
              {user?.displayName}{" "}
              <span className="  pt-1 rounded-full">
                <HiBadgeCheck />
              </span>
            </h2>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex justify-center items-center gap-4 mt-2 md:mt-10">
          <span className="bg-yellow-400/30 p-3 rounded-full text-xl font-medium">
            🥇
          </span>
          <span className="bg-gray-600/30 text-white p-3 rounded-full text-xl font-medium">
            🥉
          </span>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-3xl font-bold mb-2">Recent Posts</h3>
        <ul className="space-y-1">
          {posts.map((post, idx) => (
            <li key={idx} className="p-2 rounded bg-base-300  text-sm ">
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyProfile;
