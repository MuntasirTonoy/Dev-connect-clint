import React from "react";

const MyPosts = () => {
  const posts = [
    {
      title: "Intro to Firebase",
      upVote: 10,
      downVote: 2,
    },
    {
      title: "Using Tailwind with React",
      upVote: 5,
      downVote: 0,
    },
  ];

  return (
    <div className="card bg-base-200 p-6 text-base-content">
      <h2 className="text-xl font-bold mb-4">My Posts</h2>

      {/* Table scroll only on small screens */}
      <div className="overflow-x-auto">
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
                <td className="py-2">{post.title}</td>
                <td>{post.upVote - post.downVote}</td>
                <td>
                  <button className="text-blue-500 hover:underline">
                    Comment
                  </button>
                </td>
                <td>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPosts;
