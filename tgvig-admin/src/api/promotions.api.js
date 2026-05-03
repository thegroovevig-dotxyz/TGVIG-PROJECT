import API from "./axios";

export const getPromotions = () => API.get("/promotions");
export const createPromotion = (data) => API.post("/promotions", data);
export const updatePromotion = (id, data) =>
  API.put(`/promotions/${id}`, data);
export const deletePromotion = (id) =>
  API.delete(`/promotions/${id}`);