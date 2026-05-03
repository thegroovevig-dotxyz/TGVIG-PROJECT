import API from "./axios";

export const getOrders = (memberId) =>
  API.get(`/orders/${memberId}`);