import API from "./axios";

export const getMenu = (clubId) => API.get(`/menu/${clubId}`);