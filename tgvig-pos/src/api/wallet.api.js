import API from "./axios";

export const topUpWallet = (data) =>
  API.post("/wallet/topup", data);

export const useWallet = (data) =>
  API.post("/wallet/use", data);