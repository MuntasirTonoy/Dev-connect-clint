import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import Comments from "../../Component/Comments/Comment";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router";

const PostDetails = () => {
  const [user] = useState("You"); // Replace with actual auth user later
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(12);
  const [downvoteCount, setDownvoteCount] = useState(2);

  const avatarUrl = "https://shorturl.at/WUkZ2";

  const handleUpvote = () => {
    if (!upvoted) {
      setUpvoteCount(upvoteCount + 1);
      if (downvoted) {
        setDownvoted(false);
        setDownvoteCount(downvoteCount - 1);
      }
    } else {
      setUpvoteCount(upvoteCount - 1);
    }
    setUpvoted(!upvoted);
  };

  const handleDownvote = () => {
    if (!downvoted) {
      setDownvoteCount(downvoteCount + 1);
      if (upvoted) {
        setUpvoted(false);
        setUpvoteCount(upvoteCount - 1);
      }
    } else {
      setDownvoteCount(downvoteCount - 1);
    }
    setDownvoted(!downvoted);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:py-10 py-4 grid md:grid-cols-3 gap-10">
      {/* Left: Post Content */}
      <div className="md:col-span-2">
        <div className="text-sm flex text-base-content  mb-4">
          <Link
            to="/"
            className="text-base-content items-center flex gap-1 cursor-pointer hover:bg-base-300 rounded-md p-1 "
          >
            <BsArrowLeft />
            Posts
          </Link>{" "}
          <span className="p-1"> / Post Details</span>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={avatarUrl}
            alt="author"
            className="rounded-full w-12 h-12"
          />
          <div>
            <h2 className="font-semibold text-lg">Sophia Bennett</h2>
            <p className="text-sm text-gray-500">Posted 2 days ago</p>
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl font-bold mb-2">
          How to build a MERN stack application
        </h1>
        <p className="text-base-content mb-4 md:pr-5">
          I'm looking for advice on building a full-stack application using the
          MERN Stack (MongoDB, Express.js, React, Node.js). I'm particularly
          interested in best practices for structuring the project, handling
          authentication, and managing state. Any tips or resources would be
          greatly appreciated! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Odio laborum harum praesentium voluptate quam
          accusamus vitae quibusdam. Sed, est. Aperiam quisquam molestiae autem
          dolore ipsum? Et, aspernatur?Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Ea dolorum fugiat, ut esse corrupti, assumenda
          accusantium reiciendis in sunt dolores ullam veniam et? Sapiente ipsa
          quas facere animi laudantium quo, ducimus velit, nulla nostrum at
          reiciendis optio perferendis eius quia odit quam repellendus veniam
          ipsum maxime exercitationem hic odio rerum eaque. Nostrum sunt tempore
          cumque tenetur. Molestiae, modi hic sequi libero assumenda fugiat at
          consequuntur repellendus id iure tenetur unde consectetur est magni
          iusto reiciendis voluptas, in minima impedit! Odio molestiae dolorem,
          consectetur est fugit, molestias facere eligendi voluptatem inventore
          nobis fuga incidunt, quo harum provident minus? Earum, voluptatum sed.
        </p>

        {/* Tags */}
        <div className="flex gap-2 mb-6">
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
            MERN
          </span>
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
            Full-Stack
          </span>
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
            JavaScript
          </span>
        </div>

        {/* Post Actions */}
        <div className="flex items-center gap-6 text-gray-600 text-md mb-6">
          <button
            onClick={handleUpvote}
            className={`p-2 rounded-full flex items-center gap-1 ${
              upvoted ? "bg-base-content text-white" : "bg-gray-200"
            }`}
          >
            <FaArrowUp /> <span>{upvoteCount}</span>
          </button>
          <button
            onClick={handleDownvote}
            className={`p-2 rounded-full flex items-center gap-1 ${
              downvoted ? "bg-base-content text-white" : "bg-gray-200"
            }`}
          >
            <FaArrowDown /> <span>{downvoteCount}</span>
          </button>
          <div className="flex items-center gap-1 text-base-content text-xl">
            <FaRegCommentAlt /> <span className="text-sm">8</span>
          </div>
        </div>
      </div>

      {/* Right: Comments */}
      <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 pr-2">
        <Comments user={user} />
      </div>
    </section>
  );
};

export default PostDetails;
