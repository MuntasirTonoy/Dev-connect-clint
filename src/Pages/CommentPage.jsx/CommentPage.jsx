import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByPostId, reportCommentById } from "../../Hoocks/Api";
import Swal from "sweetalert2";
import Loading from "../../Component/Loading/Loading";
import { Helmet } from "react-helmet-async";
import CommentModal from "../../Component/Modals/CommentModal";

const feedbackOptions = [
  "This is offensive",
  "Irrelevant or spam",
  "Contains misleading info",
];

const CommentPage = () => {
  const { postId } = useParams();
  const [reportedIds, setReportedIds] = useState({});
  const [selectedFeedback, setSelectedFeedback] = useState({});

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });

  const handleFeedbackChange = (commentId, feedback) => {
    setSelectedFeedback((prev) => ({ ...prev, [commentId]: feedback }));
  };

  const handleReport = async (commentId) => {
    const feedback = selectedFeedback[commentId];
    if (!feedback) return;

    try {
      await reportCommentById(commentId, feedback);
      setReportedIds((prev) => ({ ...prev, [commentId]: true }));
      Swal.fire("Reported!", "Comment has been reported.", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to report the comment.", "error");
    }
  };

  const openModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMessage("");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="card bg-base-200 p-6 text-base-content">
      <Helmet>
        <title>Comments</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-4">All Comments</h2>
      <div className="overflow-x-auto">
        <table className="table w-full min-w-[600px] text-sm">
          <thead className="text-left border-b">
            <tr>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => {
              const hasFeedback = comment.feedback || reportedIds[comment._id];
              const feedbackValue = hasFeedback
                ? comment.feedback
                : selectedFeedback[comment._id] || "";

              const isLong = comment.message.length > 20;
              const preview = isLong
                ? comment.message.slice(0, 20) + "..."
                : comment.message;

              return (
                <tr key={comment._id}>
                  <td>{comment.email}</td>
                  <td>
                    {preview}{" "}
                    {isLong && (
                      <button
                        className="text-blue-500 underline ml-2"
                        onClick={() => openModal(comment.message)}
                      >
                        Read More
                      </button>
                    )}
                  </td>
                  <td>
                    <select
                      className="select"
                      value={feedbackValue}
                      onChange={(e) =>
                        handleFeedbackChange(comment._id, e.target.value)
                      }
                      disabled={hasFeedback}
                    >
                      <option disabled value="">
                        Select a feedback
                      </option>
                      {feedbackOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-warning"
                      disabled={hasFeedback || !selectedFeedback[comment._id]}
                      onClick={() => handleReport(comment._id)}
                    >
                      {hasFeedback ? "Reported" : "Report"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for full comment */}
      <CommentModal
        isOpen={modalOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default CommentPage;
