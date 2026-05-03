import API from "./axios";

export const getClubs = () => API.get("/clubs");