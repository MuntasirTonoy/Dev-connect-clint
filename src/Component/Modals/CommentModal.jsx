import React from "react";

const CommentModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-transparent  backdrop-blur-xs  flex items-center justify-center">
      <div className="modal modal-open">
        <div className="modal-box bg-base-300 text-base-content relative">
          <button
            className="btn btn-sm btn-circle bg-base-100 absolute right-2 top-2"
            onClick={onClose}
          >
            X
          </button>
          <h3 className="font-bold text-lg mb-4">Full Comment</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
