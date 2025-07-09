import React from "react";

const popularSearches = [
  {
    keyword: "ReactJS",
    time: "2025-07-09T10:30:00Z",
    category: "Frontend Framework",
    popularityScore: 95,
    description:
      "A JavaScript library for building user interfaces, known for its component-based architecture and virtual DOM.",
  },
  {
    keyword: "Tailwind CSS",
    time: "2025-07-09T09:45:00Z",
    category: "CSS Framework",
    popularityScore: 88,
    description:
      "A utility-first CSS framework for rapidly building custom designs without leaving your HTML.",
  },
  {
    keyword: "Next.js",
    time: "2025-07-09T08:15:00Z",
    category: "Full-stack Framework",
    popularityScore: 92,
    description:
      "A React framework for production, offering server-side rendering, static site generation, and more.",
  },
  {
    keyword: "MongoDB",
    time: "2025-07-09T07:00:00Z",
    category: "NoSQL Database",
    popularityScore: 85,
    description:
      "A popular NoSQL database that stores data in flexible, JSON-like documents, known for scalability.",
  },
  {
    keyword: "Node.js",
    time: "2025-07-09T06:30:00Z",
    category: "Backend Runtime",
    popularityScore: 90,
    description:
      "A JavaScript runtime built on Chrome's V8 JavaScript engine for building scalable network applications.",
  },
  {
    keyword: "TypeScript",
    time: "2025-07-09T05:45:00Z",
    category: "Programming Language",
    popularityScore: 87,
    description:
      "A superset of JavaScript that adds static types, enhancing code quality and developer experience.",
  },
  {
    keyword: "Express.js",
    time: "2025-07-09T04:00:00Z",
    category: "Backend Framework",
    popularityScore: 78,
    description: "A fast, unopinionated, minimalist web framework for Node.js.",
  },

  {
    keyword: "Django",
    time: "2025-07-09T02:00:00Z",
    category: "Backend Framework",
    popularityScore: 70,
    description:
      "A high-level Python web framework that encourages rapid development and clean, pragmatic design.",
  },

  {
    keyword: "Vue.js",
    time: "2025-07-08T22:30:00Z",
    category: "Frontend Framework",
    popularityScore: 82,
    description:
      "An approachable, performant and versatile framework for building web user interfaces.",
  },

  {
    keyword: "Docker",
    time: "2025-07-08T20:30:00Z",
    category: "Containerization",
    popularityScore: 78,
    description:
      "A platform that enables developers to package applications into containers—standardized executable components combining application source code with the operating system (OS) libraries and dependencies required to run that code.",
  },
];

const Search = () => {
  return (
    <div className="space-y-10">
      {/* Search Input */}
      <div className="flex items-center bg-base-100 rounded-md overflow-hidden shadow-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 outline-none text-gray-700"
        />
        <button className="bg-base-content text-white px-4 py-2 ">
          Search
        </button>
      </div>

      {/* Popular Searches */}
      <div>
        <p className="text-sm  mb-2">Popular Right Now:</p>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((item, index) => (
            <button
              key={index}
              className="px-3  shadow-md py-1 bg-base-300 text-sm  text-base-content rounded-full hover:bg-base-content hover:text-base-300 transition-all ease-in-out"
            >
              {item.keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
