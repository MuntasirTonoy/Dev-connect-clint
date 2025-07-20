import axios from "axios";
import { getAuth } from "firebase/auth";

// const api = axios.create({
//   baseURL: "http://localhost:3000",
// });
const api = axios.create({
  baseURL: "https://dev-connect-server.vercel.app",
});

// Axios request interceptor to add Firebase ID token
api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// Your existing exported API functions using this `api` instance, example:

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

export const createPost = async (postData) => {
  const response = await api.post("/posts", postData);
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const searchPostsByTag = async (tag) => {
  try {
    const response = await api.get("/posts/search", {
      params: { tag },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export const updateVote = async (postId, voteType) => {
  const response = await api.patch(`/posts/${postId}/vote`, { voteType });
  return response.data;
};

export const saveUserIfNew = async (userData) => {
  const response = await api.put("/users", userData);
  return response.data;
};
export const fetchUserByEmail = async (email) => {
  const response = await api.get(`/users/${email}`);
  return response.data;
};

export const fetchAnnouncements = async () => {
  const response = await api.get("/announcements");
  return response.data;
};

export const fetchTags = async () => {
  const response = await api.get("/tags");
  return response.data;
};

export const postComment = async (commentData) => {
  const response = await api.post("/comments", commentData);
  return response.data;
};

export const fetchCommentsByPostId = async (postId) => {
  const response = await api.get(`/comments/${postId}`);
  return response.data;
};

export const deleteCommentById = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};
export const reportCommentById = async (commentId, feedback) => {
  const response = await api.patch(`/comments/${commentId}`, { feedback });
  return response.data;
};
export const switchTheme = (newTheme) => {
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

export const initTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  switchTheme(savedTheme);
};
export const createPaymentIntent = async (amount) => {
  const response = await api.post("/create-payment-intent", {
    price: parseFloat(amount),
  });
  return response.data.clientSecret;
};
export const updateUserPaymentStatus = async (email) => {
  const response = await api.patch("/users/payment-status", { email });
  return response.data;
};
