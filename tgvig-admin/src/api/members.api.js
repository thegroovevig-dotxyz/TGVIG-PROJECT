import API from "./axios";

export const getMembers = () => API.get("/members");
export const getMember = (id) => API.get(`/members/${id}`);
export const updateMember = (id, data) => API.put(`/members/${id}`, data);
export const deleteMember = (id) => API.delete(`/members/${id}`);