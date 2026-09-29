import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAPI = {
  signup: (data) => api.post("/signup", data),
  login: (data) => api.post("/login", data),
  logout: () => api.post("/logout"),
  getUser: () => api.get("/user"),
};

export const postAPI = {
  createPost: (data) =>
    api.post("/post", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getPost: (id) => api.get(`/post/${id}`),
  deletePost: (id) => api.delete(`/deletepost/${id}`),
  updatePost: (id, data) =>
    api.patch(`/post/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  likePost: (id) => api.post(`/post/${id}/like`),
  sharePost: (id) => api.post(`/post/${id}/share`),
};

export const feedAPI = {
  getFeed: (page = 1, limit = 10) =>
    api.get(`/feed?page=${page}&limit=${limit}`),
  getTrending: () => api.get("/feed/trending"),
};

export const commentAPI = {
  getComments: (postId) => api.get(`/comments/post/${postId}`),
  createComment: (data) => api.post("/comments", data),
  deleteComment: (id) => api.delete(`/comments/${id}`),
  updateComment: (id, data) => api.patch(`/comments/${id}`, data),
};

export const userAPI = {
  getUser: (id) => api.get(`/user/${id}`),
  updateUser: (id, data) =>
    api.patch(`/user/${id}`, data, {
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" },
    }),
  followUser: (id) => api.post(`/user/${id}/follow`),
  deleteUser: (id) => api.delete(`/user/${id}`),
  getNearbyUsers: (lng, lat, distance = 10000) => api.get(`/users/nearby?lng=${lng}&lat=${lat}&distance=${distance}`),
};

export default api;
