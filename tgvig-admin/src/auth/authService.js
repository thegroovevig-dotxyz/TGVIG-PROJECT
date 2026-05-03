import API from "../api/axios";

export const login = async (data) => {
  const res = await API.post("/members/login", data);

  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};