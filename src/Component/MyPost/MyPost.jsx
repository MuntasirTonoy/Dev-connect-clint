import React, { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchPostsByEmail } from "../../Hoocks/Api";
import Loading from "../Loading/Loading";

const MyPosts = () => {
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
  console.log(posts);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="card bg-base-200 p-6 text-base-content"
    >
      <h2 className="text-3xl font-bold mb-4">My Posts</h2>

      {/* Table scroll only on small screens */}
      <div className="overflow-x-auto">
        {posts.length > 0 ? (
          <table className="w-full min-w-[500px] text-sm">
            <thead className="text-left mb-10 border-b border-gray-300">
              <tr>
                <th className="py-2">Title</th>
                <th>Votes</th>
                <th>Comment</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post, idx) => (
                <tr key={idx}>
                  <td className="py-2 md:text-lg">{post.title}</td>
                  <td className="pl-2">
                    {post.upVote.length + post.downVote.length}
                  </td>
                  <td>
                    <button className="text-blue-500 hover:underline">
                      Comment
                    </button>
                  </td>
                  <td>
                    <button className="text-red-500 btn btn-xs hover:bg-red-500 hover:text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
