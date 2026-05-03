import API from "./axios";

export const getMember = (id) => API.get(`/members/${id}`);

export const searchMembers = (query) =>
  API.get(`/members?search=${query}`);