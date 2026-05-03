import API from "./axios";

export const checkout = (data) =>
  API.post("/checkout", data);