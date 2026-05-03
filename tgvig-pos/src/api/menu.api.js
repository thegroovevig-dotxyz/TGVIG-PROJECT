import API from "./axios";

export const getMenu = (clubId) => {
  return API.get(`/menu/${clubId}`);
};