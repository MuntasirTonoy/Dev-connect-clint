import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Adjust for production
});

// GET all posts or posts by email
export const fetchPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const fetchPostsByEmail = async (email) => {
  const response = await api.get("/posts", {
    params: { email },
  });
  return response.data;
};

// POST a new post
export const createPost = async (postData) => {
  const response = await api.post("/posts", postData);
  return response.data;
};

// GET single post by ID
export const fetchPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

// PATCH to update votes on a post
export const updateVote = async (postId, userEmail, voteType) => {
  const res = await api.patch(`/posts/${postId}/vote`, {
    userEmail,
    voteType,
  });
  return res.data;
};

// PUT user (store only if new)
export const saveUserIfNew = async (userData) => {
  const res = await api.put("/users", userData);
  return res.data;
};
