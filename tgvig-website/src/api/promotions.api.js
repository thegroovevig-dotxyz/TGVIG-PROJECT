import API from "./axios";

export const getPromotions = (clubId) =>
  API.get(`/promotions`);