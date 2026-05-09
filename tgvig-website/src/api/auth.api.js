import axios from "axios";

const API = "http://10.0.0.7:5000/api/members";

export const register = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};