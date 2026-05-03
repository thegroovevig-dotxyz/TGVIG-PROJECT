import API from "./axios";

export const getPromotions = (clubId) => {
  return API.get(`/promotions/${clubId}`);
};