import api from "./axios";

export const getMenu = (clubId) => API.get(`/menu/${clubId}`);
export const createMenu = (data) => API.post("/menu", data);
export const updateMenu = (id, data) => API.put(`/menu/${id}`, data);
export const deleteMenu = (id) => API.delete(`/menu/${id}`);