import API from "./axios";

export const login = (data) => API.post("/members/login", data);

export const register = (data) => API.post("/members/register", data);