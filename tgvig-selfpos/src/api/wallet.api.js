import API from "./axios";

export const useWallet = (data) => {
  return API.post("/wallet/use", data);
};

export const getMember = (id) => {
  return API.get(`/members/${id}`);
};