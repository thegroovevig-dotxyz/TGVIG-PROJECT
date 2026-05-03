import API from "./axios";

export const getWallet = (memberId) =>
  API.get(`/wallet/${memberId}`);

export const topupWallet = (data) =>
  API.post("/wallet/topup", data);