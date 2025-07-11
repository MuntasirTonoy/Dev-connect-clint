import axios from "axios";

// const api = axios.create({
//   baseURL: "https://dev-connect-server.vercel.app",
// });
const api = axios.create({
  baseURL: "http://localhost:3000",
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

// Delete a post by ID
export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
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

// announcements API
export const fetchAnnouncements = async () => {
  const response = await api.get("/announcements");
  return response.data;
};
// tags   API
export const fetchTags = async () => {
  const response = await api.get("/tags");
  return response.data;
};
// Add a new comment
export const postComment = async (commentData) => {
  const response = await api.post("/comments", commentData);
  return response.data;
};

// Get comments by post ID
export const fetchCommentsByPostId = async (postId) => {
  const response = await api.get(`/comments/${postId}`);
  return response.data;
};
// DELETE comment by ID
export const deleteCommentById = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};
