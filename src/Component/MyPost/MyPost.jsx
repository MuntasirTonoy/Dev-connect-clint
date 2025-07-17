import React, { useContext, useEffect } from "react";
import { DashboardContext } from "../../Pages/Dashboard/DashBoard";
import Swal from "sweetalert2";
import { deletePost } from "../../Hoocks/Api";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router";

const MyPosts = () => {
  const { posts, postLoading, postRefetch } = useContext(DashboardContext);
  const navigate = useNavigate();
  useEffect(() => {
    // Force a refetch when the component mounts
    postRefetch();
  }, [postRefetch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deletePost(id);
          if (res.success) {
            await Swal.fire(
              "Deleted!",
              "Your post has been deleted.",
              "success"
            );
            await postRefetch(); // re-fetch using function passed from context
          } else {
            Swal.fire("Failed!", "Post not found or already deleted.", "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", error.message || "Something went wrong!", "error");
        }
      }
    });
  };

  if (postLoading || !posts) return <Loading />;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="card bg-base-200 p-6 text-base-content"
    >
      <h2 className="text-3xl font-bold mb-4">My Posts</h2>

      <div className="overflow-x-auto">
        {posts.length > 0 ? (
          <table className="w-full min-w-[500px] text-sm">
            <thead className="text-left border-b border-gray-300">
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
                    <button
                      onClick={() => navigate(`/comments/${post._id}`)}
                      className="text-blue-500 hover:underline"
                    >
                      Comment
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 btn btn-xs hover:bg-red-500 hover:text-white"
                    >
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
