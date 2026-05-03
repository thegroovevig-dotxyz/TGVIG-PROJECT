import API from "./axios";

export const getBlogs = (clubId) => API.get(`/blogs/${clubId}`);
export const createBlog = (data) => API.post("/blogs", data);
export const updateBlog = (id, data) =>
  API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) =>
  API.delete(`/blogs/${id}`);