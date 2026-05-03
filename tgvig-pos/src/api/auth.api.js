import API from "./axios";

export const login = (data) => API.post("/members/login", data);
