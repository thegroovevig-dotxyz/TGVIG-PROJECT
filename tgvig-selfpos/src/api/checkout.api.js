import API from "./axios";

export const checkout = (data) => {
  return API.post("/checkout", data);
};