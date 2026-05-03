import API from "./axios";

// GET promotions (optionally by club)
export const getPromotions = (clubId) =>
  API.get(`/promotions${clubId ? `?clubId=${clubId}` : ""}`);