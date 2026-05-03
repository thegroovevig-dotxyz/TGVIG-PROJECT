import API from "./axios";

export const getClubs = () => API.get("/clubs");
export const createClub = (data) => API.post("/clubs", data);
export const updateClub = (id, data) => API.put(`/clubs/${id}`, data);
export const deleteClub = (id) => API.delete(`/clubs/${id}`);