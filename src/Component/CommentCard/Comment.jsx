import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentCard = ({ user }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const avatarUrl = "https://shorturl.at/WUkZ2";

  useEffect(() => {
    axios
      .get("/comments.json")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setComments(res.data);
        }
      })
      .catch((err) => console.error("Error loading comments:", err));
  }, []);

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      const newComment = {
        name: user,
        time: "Just now",
        message: commentInput,
        avatar: avatarUrl,
      };
      setComments([newComment, ...comments]);
      setCommentInput("");
    }
  };

  const handleDelete = (index) => {
    const updated = [...comments];
    updated.splice(index, 1);
    setComments(updated);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Comment Input Box (Fixed at top of sidebar) */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          rows={3}
        ></textarea>
        <button
          className="mt-2 bg-base-content text-base-100 px-4 py-2 rounded-md "
          onClick={handleCommentSubmit}
        >
          Post Comment
        </button>
      </div>

      {/* Scrollable Comments List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
        {comments.map((comment, index) => (
          <div key={index} className="bg-base-300 p-4 rounded-md relative">
            <div className="flex items-start gap-3">
              <img
                src={avatarUrl}
                alt="user"
                className="rounded-full w-10 h-10"
              />
              <div>
                <h4 className="font-medium">{comment.name}</h4>
                <p className="text-gray-500 text-sm">{comment.time}</p>
                <p className="mt-1">{comment.message}</p>
              </div>
            </div>
            {comment.name === user && (
              <button
                onClick={() => handleDelete(index)}
                className="text-sm text-red-500 hover:underline mt-2 ml-14"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentCard;
