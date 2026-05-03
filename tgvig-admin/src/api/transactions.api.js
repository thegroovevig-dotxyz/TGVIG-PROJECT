import API from "./axios";

export const getTransactions = () => API.get("/transactions");
export const getMemberTransactions = (id) =>
  API.get(`/transactions/${id}`);