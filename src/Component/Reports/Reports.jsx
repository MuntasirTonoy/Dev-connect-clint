import React from "react";
import { useQuery, useQueries, useQueryClient } from "@tanstack/react-query";
import {
  deleteCommentById,
  fetchReportedComments,
  fetchPostById,
} from "../../Hoocks/Api";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const Reports = () => {
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reportedComments"],
    queryFn: fetchReportedComments,
  });

  const postResults = useQueries({
    queries: comments.map((comment) => ({
      queryKey: ["post", comment.postId],
      queryFn: () => fetchPostById(comment.postId),
      enabled: !!comment.postId,
    })),
  });

  const postsById = {};
  postResults.forEach((result, idx) => {
    const comment = comments[idx];
    postsById[comment.postId] = result.data || null;
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the comment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteCommentById(id);
      await queryClient.invalidateQueries({ queryKey: ["reportedComments"] });
      Swal.fire("Deleted!", "Comment removed successfully.", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error", "Failed to delete comment.", "error");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <p>Failed to load reported comments</p>;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h2 className="md:text-4xl text-2xl md:font-bold font-semibold mb-5">
        Reported Comments
      </h2>

      {comments.length === 0 ? (
        <p className="text-gray-600">No reported comments found.</p>
      ) : (
        <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2">
          {comments.map((comment) => {
            const post = postsById[comment.postId];
            return (
              <ReportedCommentCard
                key={comment._id}
                comment={comment}
                post={post}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const ReportedCommentCard = ({ comment, post, onDelete }) => {
  return (
    <div className="bg-base-200 border border-base-300 rounded-lg p-5 md:p-7 flex flex-col md:flex-row justify-between items-start gap-6 shadow-sm">
      {/* Left Section */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={comment.avatar}
            alt={comment.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-base-content">
              <span className="font-semibold">{comment.name}</span>
            </p>
            <p className="text-xs text-gray-500">{comment.email}</p>
          </div>
        </div>

        <div className="space-y-2 mt-2">
          {post?.title && (
            <p className="text-sm text-base-content">
              Post Title:{" "}
              <span className="font-medium text-gray-800">{post.title}</span>
            </p>
          )}

          <p className="text-base-content font-medium">"{comment.message}"</p>

          <p className="text-sm text-red-500 bg-red-500/10 px-3 py-1 rounded-full inline-block">
            {comment.feedback}
          </p>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex flex-col gap-3 w-full md:w-auto">
        <button
          onClick={() => onDelete(comment._id)}
          className="btn btn-sm w-full md:w-auto hover:bg-red-600 hover:text-white"
        >
          Delete Comment
        </button>

        {post && (
          <Link
            to={`/post/${post._id}`}
            className="btn btn-sm w-full md:w-auto hover:bg-blue-100/30"
          >
            View Post
          </Link>
        )}
      </div>
    </div>
  );
};

export default Reports;
