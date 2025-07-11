import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/AuthContext";
import { postComment, deleteCommentById } from "../../Hoocks/Api";
import { formatDistanceToNow, format, differenceInDays } from "date-fns";

const Comments = ({ comments = [], postId, onCommentAdd }) => {
  const { user } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    if (!user?.email || !newComment.trim()) {
      return Swal.fire("Error", "Login and message required", "error");
    }

    const commentObj = {
      name: user.displayName || "Anonymous",
      time: new Date().toLocaleString(),
      message: newComment,
      avatar: user.photoURL || "https://via.placeholder.com/40",
      postId,
    };

    try {
      await postComment(commentObj);
      setNewComment("");
      await onCommentAdd(); // Refresh comments
      Swal.fire("Posted!", "Your comment has been added.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to post comment.", "error");
    }
  };

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
      await onCommentAdd(); // Refresh comments
      Swal.fire("Deleted!", "Comment removed successfully.", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error", "Failed to delete comment.", "error");
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Comment Input Box */}
      <div className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-base-content"
          rows={3}
        ></textarea>
        <button
          onClick={handleCommentSubmit}
          className="mt-2 bg-base-content text-base-100 px-4 py-2 rounded-md hover:opacity-90"
        >
          Post Comment
        </button>
      </div>

      {/* Scrollable Comments List */}
      <div className="flex-1  pr-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-base-300 p-4 rounded-md">
              <div className="flex items-start gap-3">
                <img
                  src={comment.avatar || "https://via.placeholder.com/40"}
                  alt="user"
                  className="rounded-full w-10 h-10"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{comment.name}</h4>
                  <p className="text-gray-500 text-sm">
                    {comment.createdAt
                      ? differenceInDays(
                          new Date(),
                          new Date(comment.createdAt)
                        ) >= 2
                        ? format(
                            new Date(comment.createdAt),
                            "MMM dd, yyyy 'at' p"
                          )
                        : formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })
                      : "Just now"}
                  </p>

                  <p className="mt-1 text-base-content">{comment.message}</p>

                  {/* Show delete only if comment made by logged-in user */}
                  {user?.email === comment.email && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-sm text-red-500 hover:underline mt-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
