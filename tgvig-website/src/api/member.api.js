import API from "./axios";

export const getMember = (id) =>
  API.get(`/members/${id}`);