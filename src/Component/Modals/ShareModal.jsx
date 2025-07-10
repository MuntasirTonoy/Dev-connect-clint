import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import { IoClose } from "react-icons/io5";

const ShareModal = ({ url, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-transparent  backdrop-blur-xs  flex items-center justify-center px-4">
      <div className="bg-base-300 rounded-xl shadow-sm p-6 w-full max-w-md relative animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-base-content hover:text-error"
        >
          <IoClose />
        </button>

        {/* Modal Title */}
        <h3 className="text-lg font-semibold mb-4 text-base-content">
          Share on:
        </h3>

        {/* Share Buttons */}
        <div className="flex  gap-4 mb-5">
          <FacebookShareButton url={url}>
            <FacebookIcon size={48} round />
          </FacebookShareButton>

          <WhatsappShareButton url={url}>
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>

          <TwitterShareButton url={url}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>

          <LinkedinShareButton url={url}>
            <LinkedinIcon size={48} round />
          </LinkedinShareButton>
        </div>

        {/* Copy Link Box */}
        <div className="flex items-center gap-2  rounded-lg p-2 bg-base-100">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button
            onClick={handleCopy}
            className="btn btn-sm bg-base-content text-base-100 "
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
